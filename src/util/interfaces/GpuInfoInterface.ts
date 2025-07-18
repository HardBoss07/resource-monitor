export interface GpuInfoInterface {
    name: string;
    temperature: number;
    memory_used_mb: number;
    memory_total_mb: number;
    utilization_percent: number;
    fan_speed_percent: number;
}