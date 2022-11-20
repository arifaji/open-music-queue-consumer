class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      console.log('message', JSON.parse(message.content.toString()));
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._playlistsService.getPlaylist(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
