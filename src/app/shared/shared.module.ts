import { NgModule } from "@angular/core";
import { NotificationPanelComponent } from "./components/notification-panel/notification-panel.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AutoFocusDirective } from "./directives/auto-focus.directive";
import { BigEnglishLettersWithNumbersDirective } from "./directives/big-english-letters-with-numbers.directive";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { CollapsableDirective } from "./directives/collapsable.directive";
import { CurrencyDirective } from "./directives/currency.directive";
import { DigitOnlyDirective } from "./directives/digit-only.directive";
import { DropdownDirective } from "./directives/dropdown.directive";
import { EnglishLettersWithNumbersDirective } from "./directives/english-letters-with-numbers.directive";
import { PasswordInputToggleDirective } from "./directives/password-input-toggle.directive";
import { TooltipDirective } from "./directives/tooltip.directive";
import { AbsPipe } from "./pipes/abs.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { MinuteSecondsPipe } from "./pipes/minute-seconds.pipe";
import { RemoveDashes } from "./pipes/remove-dashes.pipe";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DialogComponent } from "./dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { LoaderComponent } from "./components/loader/loader.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    NotificationPanelComponent,
    AutoFocusDirective,
    BigEnglishLettersWithNumbersDirective,
    ClickOutsideDirective,
    CollapsableDirective,
    CurrencyDirective,
    DigitOnlyDirective,
    DropdownDirective,
    EnglishLettersWithNumbersDirective,
    PasswordInputToggleDirective,
    TooltipDirective,
    AbsPipe,
    FilterPipe,
    MinuteSecondsPipe,
    RemoveDashes,
    DialogComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    FormsModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    NotificationPanelComponent,
    AutoFocusDirective,
    BigEnglishLettersWithNumbersDirective,
    ClickOutsideDirective,
    CollapsableDirective,
    CurrencyDirective,
    DigitOnlyDirective,
    DropdownDirective,
    EnglishLettersWithNumbersDirective,
    PasswordInputToggleDirective,
    TooltipDirective,
    AbsPipe,
    FilterPipe,
    MinuteSecondsPipe,
    RemoveDashes,
    DialogComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    LoaderComponent
  ]
})
export class SharedModule {
}
