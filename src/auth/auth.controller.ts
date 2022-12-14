import {
  Controller,
  InternalServerErrorException,
  UnauthorizedException,
  Request,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { success } from "../lib/response";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req: any): Promise<any> {
    const token = this.authService.login(req.user);
    if (req.user.Type !== req.body.type) {
      throw new UnauthorizedException();
    } else {
      const date = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      const updatedLogin = await this.authService.updateUserLastLogin(
        req.user.UserId,
        date
      );
      if (!updatedLogin) {
        throw new InternalServerErrorException();
      }

      return success(token);
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  async logout(@Request() req: any): Promise<any> {
    const token = req.headers.authorization.split(" ")[1];
    return success(await this.authService.logout(token));
  }
}
