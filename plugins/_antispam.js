let handler = m => m
module.exports = {
    async all(m) {
        if (!m.message) return
        this.spam = this.spam ? this.spam : {}
        if (m.sender in this.spam) {
            this.spam[m.sender].count++
            if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 5) {
                if (this.spam[m.sender].count > 5) {
                    //global.db.data.users[m.sender].banned = true
                    if (m.fromMe) return
                    m.reply('*Kamu dibanned karena spam!!!*')
                    m.reply(`
                    {
                    status : banned
                    { result : 404 }
                    let users = global.db.data.users
                    users[m.sender].banned = true
                    }`)
                    let users = global.db.data.users
                    users[m.sender].banned = true
                    //if (m.fromMe) return
                //db.data.users[m.sender].banned = true
                //db.data.users[m.sender].banned = true
                    
                }
                this.spam[m.sender].count = 0
                this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
            }
        }
        else this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
    }
}

/*

handler.all = async function (m) {
    //if (db.data.settings[this.user.jid].antispam) return // antispam aktif?
    if (m.isBaileys && m.fromMe) return
    if (!m.message) return
    if (!m.isCommand) return
    if (db.data.users[m.sender].banned) return
    if (db.data.chats[m.chat].isBanned) return
    this.spam = this.spam ? this.spam : {}
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
            if (this.spam[m.sender].count > 3) {
                
                await this.sendButton(m.chat, 'kamu dibanned karena spam!', footer, 'Pemilik Bot', '.nowner')
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    }
    else this.spam[m.sender] = {
        jid: m.sender,
        count: 0,
        lastspam: 0
    }
}

module.exports = handler
*/
