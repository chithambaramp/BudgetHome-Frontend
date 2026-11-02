import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.scss']
})
export class OtpBoxComponent implements OnInit, OnDestroy, AfterViewInit {

  Data: any;

  public event: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpDigits: string[] = ['', '', '', '', '', ''];

  remainingSeconds = 120;
  error!: string;
  verifying = false;
  resending = false;
  isLoading = signal(false);
  private timerId?: ReturnType<typeof setInterval>;

  constructor(public bsModalRef: BsModalRef, public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.startTimer();
    this.generateOtp();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.otpInputs.first?.nativeElement.focus();
    }, 100);
  }

  // IMPORTANT: Keep each input associated with its own index.
  trackByIndex(index: number): number {
    return index;
  }

  private startTimer(): void {
    this.clearTimer();
    this.remainingSeconds = 120;

    this.timerId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    // Keep only numeric characters.
    const digits = input.value.replace(/\D/g, '');

    // Handle a multi-digit value supplied by browser autofill.
    if (digits.length > 1) {
      this.setOtpDigits(digits.slice(0, 6));
      return;
    }

    const digit = digits;

    // Update only the current position.
    this.otpDigits[index] = digit;
    this.error = '';

    // Keep the current input consistent with its state.
    input.value = digit;

    // Move exactly one box forward.
    if (digit && index < 5) {
      this.focusInput(index + 1);
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      event.preventDefault();

      if (this.otpDigits[index]) {
        this.otpDigits[index] = '';
        input.value = '';
      } else if (index > 0) {
        this.otpDigits[index - 1] = '';
        this.focusInput(index - 1);
      }

      this.error = '';
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.focusInput(index + 1);
      return;
    }
  }

  onOtpPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();

    const pasted = event.clipboardData
      ?.getData('text')
      .replace(/\D/g, '')
      .slice(0, 6) ?? '';

    if (!pasted) {
      return;
    }

    // Paste digits starting from the focused box.
    const nextDigits = [...this.otpDigits];

    for (let i = 0; i < pasted.length && index + i < 6; i++) {
      nextDigits[index + i] = pasted[i];
    }

    this.setOtpDigits(nextDigits.join(''));

    // Focus the next empty box, or the last box when complete.
    const nextEmpty = this.otpDigits.findIndex(
      (digit, i) => i >= index && !digit
    );

    this.focusInput(nextEmpty === -1 ? 5 : nextEmpty);
  }

  private setOtpDigits(value: string): void {
    const digits = value.replace(/\D/g, '').slice(0, 6);

    this.otpDigits = Array.from(
      { length: 6 },
      (_, i) => digits[i] ?? ''
    );

    this.error = '';

    // Update each DOM input to match the corresponding state.
    requestAnimationFrame(() => {
      this.otpInputs?.forEach((ref, i) => {
        ref.nativeElement.value = this.otpDigits[i];
      });

      const nextEmpty = this.otpDigits.findIndex(digit => !digit);
      this.focusInput(nextEmpty === -1 ? 5 : nextEmpty);
    });
  }

  private focusInput(index: number): void {
    requestAnimationFrame(() => {
      this.otpInputs.get(index)?.nativeElement.focus();
    });
  }

  generateOtp(resend: boolean = false): void {

    this.error = '';
    this.isLoading.set(true);
    let data = {
      email: this.Data.email
    };
    this.auth.generateOtp(data).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);
        this.resending = false;
        if (response.statusCode === 200) {
          if (resend) {
            this.otpDigits = ['', '', '', '', '', ''];
            this.setOtpDigits('');
            this.startTimer();
            this.resending = false;
          }
          return;
        }
        this.showError(response.message);
      },

      error: (err: any) => {
        this.isLoading.set(false);
        this.resending = false;
        this.showError(err);
      }
    });
  }

  verifyOtp(resend: boolean = false): void {
    const otp = this.otpDigits.join('');

    this.error = '';
    this.verifying = true;

    let data = {
      email: this.Data.email,
      otp: otp
    };
    this.auth.verifyOtp(data).subscribe({
      next: (response: any) => {
        this.verifying = false;

        if (response.statusCode === 200) {
          this.closeOtpModal();
          return;
        }
        this.showError(response.message);
      },

      error: (err: any) => {
        this.verifying = false;
        this.showError(err);
      }
    });
  }

  resendOtp(): void {
    if (this.remainingSeconds > 0 || this.resending) {
      return;
    }
    this.resending = true;
    let resend: boolean = true;
    this.generateOtp(resend);
  }

  private errorTimer: any;
  private showError(message: string): void {
    this.error = message;
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  closeOtpModal(): void {
    this.event.emit(true);
    this.bsModalRef.hide();
  }
}