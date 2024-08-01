export const TypeBalanceConst = (type: string) => {
    switch (type) {
        case 'CASH':
            return 'Geral';
        case 'FOOD':
            return 'Compras Comida';
        case 'MEAL':
            return 'Refeição';
        default:
            return 'Tipo não encontrado';
    }
}