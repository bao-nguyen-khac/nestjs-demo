import * as bcrypt from 'bcrypt';
export function encodePassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
