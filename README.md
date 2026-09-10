# Rizz.dsg — GitHub Pages dengan GitHub Actions

1. Ekstrak ZIP, lalu unggah SEMUA isinya ke root repository DESAINER-GACOR.
2. Folder .github harus ikut diunggah. Isinya: .github/workflows/deploy-pages.yml.
3. File HTML terbaru sudah dinamai index.html. Jangan menaruh seluruh berkas di subfolder tambahan.
4. GitHub > Settings > Pages > Source: GitHub Actions.
5. Commit ke branch main. Buka Actions > Publikasikan Rizz.dsg PWA, tunggu selesai. Jika perlu gunakan Run workflow.
6. Alamat aplikasi ditampilkan pada hasil deployment. Buka dengan Chrome Android atau Chrome/Edge PC lalu pilih Install App.

Paket ini menerbitkan PWA, tidak membangun APK/EXE. Belum dijalankan di repository Anda.
Jika folder .github tidak ikut terunggah melalui browser, pilih Add file > Create new file, beri nama .github/workflows/deploy-pages.yml, lalu salin isi file YAML dari ZIP.
Jika sudah ada workflow lain yang menerbitkan Pages, gunakan hanya satu workflow Pages agar deployment tidak saling menimpa.

Isi HTML menggunakan lampiran index(3).html tanpa perubahan, hanya nama file menjadi index.html. Manifest, service worker, dan ikon Rizz.dsg berasal dari paket sebelumnya.
Internet diperlukan saat pertama membuka. Font, Tailwind, Font Awesome, dan PDF memakai CDN; offline bergantung pada aset yang berhasil tersimpan. Data tersimpan per browser/perangkat, tidak otomatis tersinkron.

Dokumentasi: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
