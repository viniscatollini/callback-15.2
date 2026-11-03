function processarTransacaoPix(chavePix, valor, callbackAcao) {
  if (valor <= 0) {
    console.log(`Não foi possível processar R$ ${valor}: informe um valor maior que zero.\n`);
    return;
  }

  const transacao = {
    id: Math.floor(Math.random() * 100000),
    chavePix,
    valor,
    data: new Date().toLocaleTimeString()
  };

  console.log(`\nProcessamento concluído para a transação ID #${transacao.id}.`);
  
  callbackAcao(transacao);
}

function emitirComprovantePorEmail(transacao) {
  console.log(`[Envio do comprovante por e-mail concluído]`);
  console.log(`   Código: ${transacao.id} | Destino Pix: ${transacao.chavePix} | Quantia: R$ ${transacao.valor.toFixed(2)} | Hora do registro: ${transacao.data}`);
}

function creditarCashback(transacao) {
  const cashback = transacao.valor * 0.02;
  console.log(`[Cashback] Valor de R$ ${cashback.toFixed(2)} creditado como retorno.`);
}

function auditarTransacaoSuspeita(transacao) {
  if (transacao.valor > 5000) {
    console.log(`[ALERTA] ID #${transacao.id}: valor acima de R$ 5.000,00 identificado; transação encaminhada para análise.`);
  } else {
    console.log(`Auditoria concluída: transação ID #${transacao.id} aprovada.`);
  }
}

function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
  console.log(`\nIniciando o envio da notificação externa referente à transação #${transacao.id}...`);

  setTimeout(() => {
    console.log(`A loja respondeu à chamada do webhook.`);
    callbackFinalizacao(transacao);
  }, 2000);
}


console.log("=== EXECUÇÃO DE TESTES: GATEWAY PAYFAST ===");

processarTransacaoPix("vini@email.com", 150.00, emitirComprovantePorEmail);

processarTransacaoPix("676.767.676-67", 250.00, creditarCashback);

processarTransacaoPix("empresa@email.com", 8500.00, auditarTransacaoSuspeita);

processarTransacaoPix("cliente@email.com", 100.00, (transacao) => {
  const valorFinal = transacao.valor - 5;
  console.log(`Aplicado desconto de R$ 5,00. Total após o desconto: R$ ${valorFinal.toFixed(2)}`);
});

processarTransacaoPix("loja@suporte.com", 1200.00, (transacao) => {
  enviarWebhookAssincrono(transacao, (transacaoFinal) => {
    console.log(`Envio da notificação para a transação #${transacaoFinal.id} concluído com sucesso.`);
  });
});