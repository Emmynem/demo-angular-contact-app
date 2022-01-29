import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'date_split_filter'
})

export class DateSplitFilter implements PipeTransform {
    transform(date: string) {
        const raw_date = date;
        const split_raw = raw_date != undefined ? raw_date.split(" ") : null;
        const splitted_raw = split_raw != undefined ? split_raw[0] : null;
        return splitted_raw;
    }
}