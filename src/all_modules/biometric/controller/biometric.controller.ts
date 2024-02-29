import { Controller } from "@nestjs/common";
import { BiometricService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('biometric')
@Controller('')
export class BiometricController {
    constructor(private biometricService: BiometricService) {}
    
}
