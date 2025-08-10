function launchApp(appName, identifier) {
    let appURL = '';
    let webURL = '';
    let appNameDisplay = ''; // Nama aplikasi untuk ditampilkan di pesan

    // Mengatur URL berdasarkan nama aplikasi yang diterima dari parameter
    if (appName === 'instagram') {
        appURL = `instagram://user?username=${identifier}`;
        webURL = `https://www.instagram.com/${identifier}`;
        appNameDisplay = 'Instagram';
    } else if (appName === 'twitter') {
        // Skema URL Twitter (sekarang X) yang paling umum adalah 'twitter://'
        appURL = `twitter://user?screen_name=${identifier}`;
        webURL = `https://twitter.com/${identifier}`; // Gunakan twitter.com untuk versi web
        appNameDisplay = 'Twitter';
    } else if (appName === 'linkedin') {
        // Contoh untuk LinkedIn. Anda perlu mengganti 'your_profile_id' atau 'your_custom_url'
        appURL = `linkedin://profile/${identifier}`; // Atau linkedin://in/your_custom_url
        webURL = `https://www.linkedin.com/in/${identifier}`;
        appNameDisplay = 'LinkedIn';
    } else if (appName === 'email') {
        appURL = `mailto:${identifier}`;
        webURL = `mailto:${identifier}`; // Untuk mailto, webURL sama dengan appURL
        appNameDisplay = 'Email';
        window.location.href = appURL; // Untuk mailto, eksekusi langsung tanpa fallback timeout
        return; // Hentikan fungsi setelah mailto dipanggil
    } else {
        showMessage('Aplikasi tidak dikenal atau tidak didukung.', 'error');
        return; // Hentikan eksekusi jika aplikasi tidak didukung
    }

    // Coba buka aplikasi menggunakan skema URL
    // Browser akan mencoba membuka appURL. Jika aplikasi tidak terinstal,
    // maka browser biasanya tidak melakukan apa-apa atau menampilkan pesan error.
    window.location.href = appURL;

    // Set timeout sebagai fallback ke URL web jika aplikasi gagal dibuka.
    // Jika aplikasi tidak membuka setelah 750ms, secara otomatis redirect ke versi web.
    // Ini lebih halus dan tidak memerlukan interaksi pengguna.
    const fallbackTimeout = setTimeout(() => {
        // Untuk memastikan tidak ada alert/confirm, kita langsung redirect
        window.location.href = webURL;
    }, 750); // Tunggu 750ms sebelum mencoba membuka web
}
