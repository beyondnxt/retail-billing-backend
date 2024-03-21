export class CreateRoleDto {
    name: string;
    description: string;
    menuAccess: { dashboard: boolean; addUser: boolean };
}