import * as XLSX from "xlsx";

export const handleExportExcel = (data: never, userId: string) => {
    const rows = [];

    if (Array.isArray(data.user_logs) && data.user_logs.length > 0) {
        data.user_logs.forEach((log: any) => {
            rows.push({
                ID: data.user_id,
                Nombre: data.user_name,
                Email: data.user_email,
                UserCreatedAt: data.user_created_date,
                UserID: log.user_id,
                Module: log.module,
                Entity: log.entity,
                Severity: log.severity,
                IPAddress: log.ip_address,
                UserAgent: log.user_agent,
                Status: log.status,
                RequestBody: JSON.stringify(log.req_body),
                URL: log.url,
                Method: log.method,
                Hostname: log.hostname,
                ResContent: log.res_content,
                CreatedAt: log.createdAt,
                UpdatedAt: log.updatedAt,
            });
        });
    } else {
        rows.push({
            ID: data.user_id,
            Nombre: data.user_name,
            Email: data.user_email,
            UserCreatedAt: data.user_created_date,
            UserID: '',
            Module: '',
            Entity: '',
            Severity: '',
            IPAddress: '',
            UserAgent: '',
            Status: '',
            RequestBody: '',
            URL: '',
            Method: '',
            Hostname: '',
            ResContent: '',
            CreatedAt: '',
            UpdatedAt: '',
            Log: 'No hay logs disponibles',
        });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');

    XLSX.writeFile(workbook, `Reporte.Logs.User.${userId}.${new Date().toString()}.xlsx`);
};