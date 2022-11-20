const { Pool } = require('pg');
const _ = require('lodash');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const queryPlaylist = {
      text: `SELECT 
        p.id,
        p.name
      FROM playlists p
      WHERE p.id = $1`,
      values: [playlistId],
    };
    const querySongs = {
      text: `SELECT
        s.id,
        s.title,
        s.performer
      FROM playlist_songs ps
      INNER JOIN songs s ON s.id = ps.song_id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };
    const playlist = await this._pool.query(queryPlaylist);
    const songs = await this._pool.query(querySongs);
    const result = {
      playlist: {},
    };
    result.playlist = _.get(playlist, 'rows[0]');
    result.playlist.songs = _.get(songs, 'rows');
    return result;
  }
}

module.exports = PlaylistsService;
