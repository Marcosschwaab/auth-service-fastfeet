export class User {
  id: string;
  cpf: string;
  password: string;
  role: 'admin' | 'deliveryman';
  createdAt?: string;
}
