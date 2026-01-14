export interface CpuInfoInterface {
    name: string;
    usage: number;
    frequency: number;
    cores: number;
    temperature: number|null;
}