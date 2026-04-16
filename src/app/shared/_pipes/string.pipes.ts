import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
    pure: true
})
export class CapitalizePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}

// Usage HTML
// {{ 'hello world' | capitalize }} = Hello world


@Pipe({
    name: 'upper',
    pure: true
})
export class UpperPipe implements PipeTransform {

    transform(value: string): string {
        return value ? value.toString().trim().toUpperCase() : '';
    }
}

// Usage HTML
// {{ 'hello world' | upper }} = HELLO WORLD


@Pipe({
    name: 'lower',
    pure: true
})
export class LowerPipe implements PipeTransform {

    transform(value: string): string {
        return value ? value.toString().trim().toLowerCase() : '';
    }
}

// Usage HTML
// {{ 'Hello world' | lower }} = hello world


@Pipe({
    name: 'titleCase',
    pure: true
})
export class TitleCasePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// Usage HTML
// {{ 'hello world' | titleCase }} = Hello World


@Pipe({
    name: 'initials',
    pure: true
})
export class InitialsPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        return value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }
}

// Usage HTML
// {{ 'john doe' | initials }} = JD


@Pipe({
    name: 'trim',
    pure: true
})
export class TrimPipe implements PipeTransform {

    transform(value: any): string {
        return value ? value.toString().trim() : '';
    }
}

// Usage HTML
// {{ '   hello world   ' | trim }} = hello world


@Pipe({
    name: 'truncate',
    pure: true
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, limit: number = 20): string {
        if (!value) return '';

        return value.length > limit
            ? value.substring(0, limit) + '...'
            : value;
    }
}

//Usage HTML
// {{ 'This is a long description text' | truncate:10 }} = This is a ...
//need to add Tooltip in HTML


@Pipe({
    name: 'mask',
    pure: true
})
export class MaskPipe implements PipeTransform {

    transform(value: string, visible: number = 4): string {
        if (!value) return '';

        const masked = '*'.repeat(value.length - visible);
        return masked + value.slice(-visible);
    }
}

// Usage HTML
// {{ '1234567890' | mask:4 }} = ******7890