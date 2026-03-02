export class EntitlementDto {
  resource: string;
  actions: string[];
}

export class UserEntitlementsDto {
  userId: string;
  role: string;
  permissions: EntitlementDto[];
}
