import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'time_fmt_filter'
})

export class TimeFormatFilter implements PipeTransform {
    transform(time: string) {
        let raw_time = time;
        let split_raw = raw_time != undefined ? raw_time.split(":") : null;
        let splitted_raw = split_raw != undefined ? split_raw[0] : 0;
        let splitted_raw_2 = split_raw != undefined ? split_raw[1] : 0;

        let new_time_morning = splitted_raw + ":" + splitted_raw_2 + " AM";
        // let new_time_later = splitted_raw + "." + splitted_raw_2 + "PM";

        if (splitted_raw > 0 && splitted_raw <= 11) {
            return new_time_morning;
        }
        else {

            let new_time_later;

            switch (splitted_raw) {
                case "00":
                    splitted_raw = 12;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " AM";
                    return new_time_later;
                case "13":
                    splitted_raw = 1;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "14":
                    splitted_raw = 2;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "15":
                    splitted_raw = 3;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "16":
                    splitted_raw = 4;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "17":
                    splitted_raw = 5;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "18":
                    splitted_raw = 6;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "19":
                    splitted_raw = 7;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "20":
                    splitted_raw = 8;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "21":
                    splitted_raw = 9;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "22":
                    splitted_raw = 10;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "23":
                    splitted_raw = 11;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
                case "24":
                    splitted_raw = 12;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " AM";
                    return new_time_later;
                default:
                    splitted_raw = 12;
                    new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
                    return new_time_later;
            }
        }
    }
}