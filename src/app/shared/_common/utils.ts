import { FormGroup } from '@angular/forms';

export function fileUpload(event: any, cb: any) {
    let formData = new FormData();
    if (event.target.files && event.target.files[0]) {
        const size = Math.round(event.target.files[0].size / 1024);
        if (size > 25600) {
            console.log(
                "Please select a file size less than 25 MB",
                "Warning"
            );
            return;
        }
        formData.append(
            "image",
            event.target.files[0],
            event.target.files[0].name
        );
    }
    return cb(formData)
}

export function omitEmptyDeep<T extends object>(obj: T): Partial<T> {
    return omitDeep(obj, (val) => isEmpty(val));
}

export function omitNullsDeep<T extends object>(obj: T): Partial<T> {
    return omitDeep(obj, (val: any) => val == null);
}

export function omitDeep<T extends object>(obj: T, predicate: (val: any) => boolean): Partial<T> {
    const cleaned: Partial<any> = {};

    Object.keys(obj).forEach((key) => {
        let val = (obj as any)[key];

        if (predicate(val)) {
            return;
        }

        if (isPlainObj(val)) {
            val = omitDeep(val, predicate);
        }

        cleaned[key] = val;
    });

    return cleaned;
}

// export function omitEmptyDeep<T>(obj: T): Partial<T> {
//     return omitDeep(obj, (val) => isEmpty(val));
// }

// export function omitNullsDeep<T>(obj: T): Partial<T> {
//     return omitDeep(obj, (val: any) => val == null);
// }

// export function omitDeep<T>(obj: T, predicate: (val: any) => boolean): Partial<T> {
//     const cleaned: Partial<any> = {};

//     Object.keys(obj).forEach((key) => {
//         let val = (obj as any)[key];

//         if (predicate(val)) {
//             // omit this val
//             return;
//         }

//         if (isPlainObj(val)) {
//             val = omitDeep(val, predicate);
//         }

//         cleaned[key] = val;
//     });

//     return cleaned;
// }

export function isPlainObj(o: any) {
    return o && typeof o == 'object' && o.constructor == Object;
}

// export function exportXls(nativeElement: any) {
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(nativeElement);
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     XLSX.writeFile(wb, 'SheetJS.xlsx');
// }

export function isEmpty(sub: any): boolean {
    if (sub == null) {
        return true;
    }

    if (typeof sub === 'string' && sub === '') {
        return true;
    }

    if (Array.isArray(sub) && sub.length === 0) {
        return true;
    }

    if (isPlainObj(sub) && Object.keys(sub).length === 0) {
        return true;
    }

    return false;
}

export function deepFindObj(obj: any, key: any) {
    if (isEmpty(obj)) {
        return null;
    }
    return key.split('.').reduce((result: any, key: any) => {
        return result[key];
    }, obj);
}

export function isEmptyDeep(sub: any): boolean {
    if (Array.isArray(sub)) {
        return sub.every((item) => isEmptyDeep(item));
    }

    if (isPlainObj(sub)) {
        return Object.keys(sub).every((key) => isEmptyDeep(sub[key]));
    }

    return isEmpty(sub);
}

export function parseAmountUS(amountStr: string): number | string {
    if (!amountStr) {
        return '';
    }
    const amount = parseFloat(amountStr.replace(/[$,]/g, ''));
    if (isNaN(amount)) {
        return '';
    }

    return Math.round(100 * amount);
}

export function ccyFormat(num: any) {
    const floatNumber = parseFloat(num).toFixed(2)
    return floatNumber;
}

export function IsJsonString(str: any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export function campareDates(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
        let f = group.controls[from];
        let t = group.controls[to];
        if (f.value > t.value) {
            return {
                dates: "Date from should be less than Date to"
            };
        }
        return {};
    }
}

export function duplicateArrayOfObj(data: any, key: any) {
    return [
        ...new Map(
            data.map((x: any) => [key(x), x])
        ).values()
    ]
}

export function duplicateArray(data: any) {
    return [
        ...new Set(data)
    ]
}

export const filterSameObj = (arrOfObj: any) => {
    let dataArr: any = arrOfObj.map((item: any) => {
        return [item._id, item]
    });
    let maparr: any = new Map(dataArr);
    var result = [...maparr.values()];
    return result
}

// export const filterSameCode = (data) => {
//     return data.filter((value, index) => data.indexOf(value) == index);
// }

export function scrollView(id: string) {
    let top = document.getElementById(id);
    if (top !== null) {
        top.scrollIntoView({ behavior: 'smooth' });
        top = null;
    }
}