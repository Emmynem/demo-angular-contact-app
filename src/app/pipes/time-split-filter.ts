import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'time_split_filter'
})

export class TimeSplitFilter implements PipeTransform {
    transform(time: string) {
        const raw_time = time;
        const split_raw = raw_time != undefined ? raw_time.split(" ") : null;
        const splitted_raw = split_raw != undefined ? split_raw[1] : null;
        return splitted_raw;
    }
}