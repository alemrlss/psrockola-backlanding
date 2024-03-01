import { TYPE_TRANSACTION } from "src/constants/typeTransaction.enum";

interface TransactionDetails {
  amount: number;
  companyName?: string;
  clientName?: string;
}

export function generateTransactionDescription(
  type: TYPE_TRANSACTION,
  details: TransactionDetails
): string {
  //Caso cuando un cliente gaste en un video en el establecimiento
  if (type === TYPE_TRANSACTION.GASTE) {
    return `Gasto de ${
      details.amount
    } rockobits en ${details.companyName?.toUpperCase()}`;
  }

  //Caso cuando un cliente recargue en la empresa (ROCKOBITS) = (Reciba rockobits)
  if (type === TYPE_TRANSACTION.RECIBO_CLIENTE) {
    return `Recibo de ${
      details.amount
    } rockobits de ${details.companyName.toUpperCase()}`;
  }

  //Caso cuando una empresa transfiera a un cliente (Rockobits)
  if (type === TYPE_TRANSACTION.TRANSFERI) {
    return `Envio de ${details.amount} rockobits a ${details.clientName}`;
  }

  //Caso cuando una empresa compre rockobits en la plataforma con stripe
  if (type === TYPE_TRANSACTION.COMPRE) {
    return `Compra de ${details.amount} rockobits en la plataforma`;
  }

  //Caso cuando una empresa reciba rockobits por factor externo
  if (type === TYPE_TRANSACTION.RECIBO_EMPRESA) {
    return `Recibo de ${details.amount} rockobits por factor externo`;
  }

  //Caso cuando un super admin le recargue rockobits a una empresa
  if (type === TYPE_TRANSACTION.ENVIA) {
    return `Envio de ${
      details.amount
    } rockobits a la empresa ${details.companyName.toUpperCase()}`;
  }
}
