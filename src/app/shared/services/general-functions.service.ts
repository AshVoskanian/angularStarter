import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, } from "@angular/forms";
import { PasswordValidationModel } from "../models/models";


@Injectable({
  providedIn: "root",
})
export class GeneralFunctionsService {
  constructor() {
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  public returnPasswordValidationErrors(
    control: AbstractControl
  ): PasswordValidationModel {
    const validationError: PasswordValidationModel =
      new PasswordValidationModel();
    validationError.lowerCase = false;
    validationError.upperCase = false;
    validationError.number = false;
    validationError.length = false;
    // If contains lowercase
    if (control.value.toUpperCase() != control.value) {
      validationError.lowerCase = true;
    }
    // If contains uppercase
    if (control.value.toLowerCase() != control.value) {
      validationError.upperCase = true;
    }
    // If contains number
    if (/\d/.test(control.value)) {
      validationError.number = true;
    }
    // If more than 8 symbols
    if (control.value.length > 8) {
      validationError.length = true;
    }
    return validationError;
  }

  // Transforms js date type to YYYY-MM-DD string
  public JSDateTransform(date: Date) {
    const y = date.getFullYear();
    const m =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const d = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();

    return y + "-" + m + "-" + d;
  }

  public JSDateToLocalIsoString(date: Date) {
    const offsetDif = date.getTimezoneOffset();
    const d = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      new Date().getHours(),
      new Date().getMinutes() + offsetDif,
      new Date().getSeconds()
    );

    return d.toISOString();
  }

  // Iso String to ddmmyy
  public IsoStringToJoinedDate(date: string) {
    const split: string[] = date.split('T')[0].split('-');
    return split[2] + split[1] + split[0];
  }

  // Iso String to yyyymmdd
  public IsoStringToJoinedDateReverse(date: string) {
    const split: string[] = date.split('T')[0].split('-');
    return split[0] + split[1] + split[2];
  }

  // ddmmyy to JS Date
  public joinedDateToJSDate(date: string) {
    const year = Number.parseInt(date.slice(4, 8), 10);
    const month = Number.parseInt(date.slice(2, 4), 10);
    const day = Number.parseInt(date.slice(0, 2), 10);

    return new Date(year, month - 1, day);
  }

  // Transforms YYYY-MM-DD string to js date type;
  public StringToDate(date: string) {
    const year = date.split("T")[0].split("-")[0];
    const month = +date.split("T")[0].split("-")[1] - 1;
    const day = date.split("T")[0].split("-")[2];

    if (date) {
      return new Date(+year, +month, +day);
    }
  }

  base64ToPdfDownload(data: string, fileName: string = "document") {
    const pdfLink = document.createElement("a");
    pdfLink.innerHTML = "";
    pdfLink.download = fileName + ".pdf";
    pdfLink.href = "data:application/octet-stream;base64," + data;

    pdfLink.click();
  }

  downloadFile(data: string, fileName: string = "document", extension: string) {

    const element = document.createElement('a');
    element.setAttribute('href', this.setFileData(extension, data));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  setFileData(type, data) {
    if (
      type === "doc" ||
      type === "docx" ||
      type === "pdf" ||
      type === "pptx" ||
      type === "xls" ||
      type === "xlsx"
    ) {
      return data;
    } else {
      switch (type) {
        case "3g2":
          return "data:video/3gpp2;base64," + data;
        case "3gp":
          return "data:video/3gpp;base64," + data;
        case "bmp":
          return "data:image/bmp;base64," + data;
        case "jpe":
          return "data:image/jpeg;base64," + data;
        case "jpeg":
          return "data:image/jpeg;base64," + data;
        case "jpg":
          return "data:image/jpeg;base64," + data;
        case "mp4":
          return "data:video/mp4;base64," + data;
        case "mpg":
          return "data:video/mpeg;base64," + data;
        case "png":
          return "data:image/png;base64," + data;
        case "mov":
          return "data:video/quicktime;base64," + data;
      }
    }
  }

  base64ToPdfOpen(data: string) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const file = new Blob([new Uint8Array(byteNumbers)], {type: 'application/pdf;base64'});
    window.open(URL.createObjectURL(file));
  }

  copyTextToClipboard(text: string, callback?) {
    navigator.clipboard.writeText(text);

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.display = "none";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      new Promise((res, rej) => {
        document.execCommand("copy") ? res : rej;
        textArea.remove();
      });
    }

    callback();
  }

  public mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }
      let valid: boolean;
      let add: number = 0;

      if (value.includes("(") && value.includes(")")) {
        if (
          value.indexOf("(") < value.indexOf(")") &&
          value.split("(").length === 2 &&
          value.split(")").length === 2
        ) {
          add += 2;
          valid = true;
        } else {
          valid = false;
        }
      } else valid = !(value.includes("(") || value.includes(")"));

      if (
        (value.split("(").length > 2 || value.split(")").length > 2) &&
        valid
      ) {
        valid = false;
      }

      if (value.split("+").length === 2 && valid) {
        add += 1;
        valid = value.indexOf("+") === 0;
      } else if (value.split("+").length > 2) {
        valid = false;
      }

      const regex =
        "^[0-9+()]{" +
        (9 + add).toString() +
        "," +
        (20 + add).toString() +
        "}$";

      const regexValid = new RegExp(regex).test(value);
      return valid && regexValid ? null : {valid: false};
    };
  }

  public detectBrowser() {
    const browserName = ((agent) => {
      switch (true) {
        case agent.indexOf("edge") > -1:
          return "MS Edge";
        case agent.indexOf("edg/") > -1:
          return "Edge";
        // @ts-ignore
        case agent.indexOf("opr") > -1 && !!window.opr:
          return "Opera";
        // @ts-ignore
        case agent.indexOf("chrome") > -1 && !!window.chrome:
          return "Chrome";
        case agent.indexOf("trident") > -1:
          return "MS IE";
        case agent.indexOf("firefox") > -1:
          return "Mozilla Firefox";
        case agent.indexOf("safari") > -1:
          return "Safari";
        default:
          return "other";
      }
    })(window.navigator.userAgent.toLowerCase());

    return browserName;
  }

  public parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }


  public tokenExpired(token: string) {
    if (!token) {
      return true;
    }
    const expiry = this.parseJwt(token).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }
}
