import * as bcrypt from 'bcrypt';
export async function encodePassword(password: string) {
  return await bcrypt.hash(password, bcrypt.genSaltSync());
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
