
# what is this?
 - windows portable app
   - youtube playlist download.
   - youtube video download.

# how to use?

# download
- [windows app release](https://github.com/queue-download-youtube-playlist/queue-download-desktop/releases/latest)
- [firefox addon](https://addons.mozilla.org/en-US/firefox/addon/youtube-playlist-download/)

# connect firefox addons to windows app
![connect windows app](/image/connect_windows_app.png)

# click add playlist
![click_add_playlist_icon](/image/click_add_playlist_icon.png)

# download video
![click_download_video](/image/click_download_video.png)

# downloading video
![downloading video](/image/downloading_a_video.png)

---

# how does work?
- once you click context menu "download video"
   - the app will check the video data and video file are they both exists?
      - if exists
         - notification: dont need download
      - if not exists
         - open new tab, to search video data by video id
- when the search, got the video data.
   - add video data or update video data
- when the searth, got the video download link.
   - update video data
      - the app will jump to the video, and show it.
      - check download link
         - go to download video
- when the download starting
   - notification: downloading
   - the app will show the download progress
      - eg: filesize, download progress, download speed
- when the download finished
   - notification: download ok
- when the download video size is 0 or video file not exists
   - it will searching video data again by video id.


---

---

# LICENSE

[MIT LICENSE](https://github.com/queue-download-youtube-playlist/queue-download-desktop/blob/main/LICENSE)

---

end