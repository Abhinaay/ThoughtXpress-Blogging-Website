import {RegisterComponent} from '../auth/register/register.component';
import {AuthService} from '../auth/auth.service';

export function ValidateUsername(authService: AuthService, registerComponent: RegisterComponent) {
  authService.checkUsernameAvailability(registerComponent.registerForm.get('username').value).subscribe( data => {

  });

}
