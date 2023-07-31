

export const validatePassword = (password: string) => {
  const messages = [];
  const regexLength = /.{8,}/;
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;

  if (!regexLength.test(password)) {
    messages.push('Password must be at least 8 characters long');
  }

  if (!regexLowercase.test(password)) {
    messages.push('Password must contain at least one lowercase letter');
  }

  if (!regexUppercase.test(password)) {
    messages.push('Password must contain at least one uppercase letter');
  }

  if (!regexNumber.test(password)) {
    messages.push('Password must contain at least one number');
  }

  if (!regexSpecial.test(password)) {
    messages.push('Password must contain at least one special character');
  }

  return messages;
}