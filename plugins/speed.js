let os = require('os')
let util = require('util')
let { performance } = require('perf_hooks')
let { sizeFormatter } = require('human-readable')
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
    }
  })
  let old = performance.now()
  await m.reply('_Testing speed..._')
  let neww = performance.now()
  let speed = neww - old
  m.reply(`
Merespon dalam ${speed} millidetik

ðŸ’¬ Status :
- *${groupsIn.length}* Group Chats
- *${groupsIn.length}* Groups Joined
- *${groupsIn.length - groupsIn.length}* Groups Left
- *${chats.length - groupsIn.length}* Personal Chats
- *${chats.length}* Total Chats

ðŸ’» *Server Info* :
RAM: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
`.trim())
}
handler.help = ['ping', 'speed']
handler.tags = ['info']

handler.command = /^(ping|speed)$/i
module.exports = handler


