import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minuteSeconds",
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return;
    }

    const minutes: number = Math.floor(value / 60);
    const seconds: string =
      value - minutes * 60 >= 10
        ? (value - minutes * 60).toString()
        : "0" + (value - minutes * 60);
    return minutes + ":" + seconds;
  }
}
