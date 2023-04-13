# download
 - [windows app release](https://github.com/queue-download-youtube-playlist/queue-download-desktop/releases/latest)
 - [firefox addon](https://addons.mozilla.org/en-US/firefox/addon/youtube-playlist-download/)

# connect firefox addons to windows app
![connect windows app](/image/connect_windows_app.png)

# download playlist
![download playlist](/image/click_add_playlist_icon.png)

# download one video
![download one video](/image/click_download_video.png)

# tmplocation 
![tmplocation video](/image/downloading_a_video.png)

---

# how does work?
 - after you click context menu "download video"
   - addons will check the video data and video file are they both exists?
     - if exists, true. 
       - notification: dont need download
     - if not exists, 
       - notification: searching video by video id.
 - when the search, got the video data.
   - add video data
     - notification: new video data
 - when the searth, got the video download link.
   - update video data
     - the windows app will jump to the video, and show it.
     - if download link exists, true. 
       - go to download video
 - when the download starting
   - notification: tmplocation
   - the windows app will show the download progress
     - eg: filesize, download progress, download speed
 - when the download finished
   - notification: download ok
 - when the download video size is 0 or video file not exists
   - it will searching video data again by video id.

---