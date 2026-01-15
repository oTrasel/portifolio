#!/usr/bin/env node

/**
 * Gerador de JWT Secret Seguro
 * 
 * Este script gera uma chave aleatória segura para usar como JWT_SECRET
 * no arquivo .env
 */

const crypto = require('crypto');

console.log('\n🔐 Gerador de JWT Secret Seguro\n');
console.log('═'.repeat(60));

// Gera chave de 64 bytes (512 bits)
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n✅ JWT Secret gerado com sucesso!\n');
console.log('Copie e cole no seu arquivo .env:\n');
console.log('─'.repeat(60));
console.log(`JWT_SECRET=${secret}`);
console.log('─'.repeat(60));
console.log('\n⚠️  IMPORTANTE:');
console.log('   • Esta chave é única e não pode ser recuperada');
console.log('   • Guarde em local seguro');
console.log('   • NUNCA commite no Git');
console.log('   • Use chaves diferentes para dev e produção\n');
