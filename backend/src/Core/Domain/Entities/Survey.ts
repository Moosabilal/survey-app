export class Survey {
    constructor(
        public readonly name: string,
        public readonly gender: string,
        public readonly nationality: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly address: string,
        public readonly message: string,
        public readonly id?: string,
        public readonly createdAt?: Date
    ) { }
}
