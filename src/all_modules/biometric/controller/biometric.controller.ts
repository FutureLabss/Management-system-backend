import { Controller } from "@nestjs/common";
import { BiometricService } from "../services/auth.service";

@Controller('')
export class BiometricController {
    constructor(private biometricService: BiometricService) {}
    
}
