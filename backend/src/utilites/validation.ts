export class CustomValidator {
    static isEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    static passwordValidation = (
        password: string,
        minLength: number = 8,
        requireUppercase: boolean = true,
        requireLowercase: boolean = true,
        requireDigits: boolean = true,
        requireSpecialChars: boolean = true,
        disallowSpaces: boolean = true
      ): string[] => {
        const errors: string[] = [];
    
        // Check for minimum length
        if (password.length < minLength) {
          errors.push(`Password must be at least ${minLength} characters long.`);
        }

        // Check for uppercase letter
        if (requireUppercase && !/[A-Z]/.test(password)) {
          errors.push("Password must contain at least one uppercase letter.");
        }
    
        // Check for lowercase letter
        if (requireLowercase && !/[a-z]/.test(password)) {
          errors.push("Password must contain at least one lowercase letter.");
        }
    
        // Check for digits
        if (requireDigits && !/\d/.test(password)) {
          errors.push("Password must contain at least one digit.");
        }
    
        // Check for special characters
        if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          errors.push("Password must contain at least one special character.");
        }
    
        // Check for spaces
        if (disallowSpaces && /\s/.test(password)) {
          errors.push("Password should not contain spaces.");
        }
    
        // Return errors if any, otherwise empty array
        return errors;
      }
}
