export class ProductDTO {
    public code: string;
    public description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }
}
