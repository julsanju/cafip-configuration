import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule ,RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-configuration',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
    searchTerm: string = '';
    childActive: boolean = false;
    
    private readonly titles: string[] = [
        'Catálogo de entidades',
        'Catálogo de bienes y servicios',
        'Catálogo de presupuesto',
        'Catálogo de cuentas contables',
        'Catálogo de bancos',
        'Catálogo de ciudades y departamentos',
        'Catálogo de espacios',
        'Catálogo de unidades',
        'Catálogo de tipos de contrato',
        'Catálogo de modalidades de selección',
        'Catálogo de documentación mínima',
        'Catálogo de pólizas',
        'Catálogo de informes',
        'Catálogo de documentos',
        'Catálogo de documentos de soporte',
        'Catálogo de bienes agrupados',
        'Catálogo de tipos de bienes',
        'Catálogo de movimientos de almacén',
        'Catálogo de tipos de procesos',
        'Catálogo de impuestos',
        'Catálogo de códigos CIIU',
        'Catálogo de tipos de identificación',
        'Catálogo de sedes',
        'Condiciones de entrega',
        'Responsabilidades fiscales',
        'Medios de pago',
        'Tipo de personas',
        'Tipos de régimen',
        'Catálogo de países',
        'Catálogo de justificación del gasto',
        'Fuentes de financiación',
        'Catálogo de representación',
        'Actos administrativos',
        'Correos institucionales'
    ];

    /**
     * Verifica si hay resultados de búsqueda
     * @returns true si no hay resultados, false si hay resultados
     */
    get hasNoResults(): boolean {
        if (!this.searchTerm || this.searchTerm.trim() === '') {
            return false;
        }
        
        const searchLower = this.searchTerm.toLowerCase().trim();
        const hasMatches = this.titles.some(title => 
            title.toLowerCase().includes(searchLower)
        );
        
        return !hasMatches;
    }
}