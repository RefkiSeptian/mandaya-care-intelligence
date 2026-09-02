(function () {
  const routes = {
    overview: "command_center_overview.html",
    patients: "patient_360_profile.html",
    "ai-priority": "ai_priority_next_best_action.html",
    "follow-up": "follow_up_workspace.html",
  };

  function setActivePage(page) {
    document.body.dataset.page = page;

    document.querySelectorAll("nav a[data-path]").forEach((link) => {
      const linkPage = link.dataset.path;
      link.href = routes[linkPage] || "#";

      const isActive = page === linkPage;

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

      link.classList.toggle("is-active", isActive);
    });
  }

  function setupSidebarToggle() {
    const button = document.querySelector("[data-sidebar-toggle]");
    if (!button) return;

    const setOpen = (open) => {
      document.body.classList.toggle("sidebar-open", open);
      document.documentElement.classList.toggle("sidebar-open-preload", open);
      button.setAttribute("aria-expanded", String(open));
      try {
        window.localStorage.setItem("mandaya-sidebar-open", String(open));
      } catch (_error) {
        // Local files can run in stricter browser contexts.
      }
    };

    try {
      setOpen(window.localStorage.getItem("mandaya-sidebar-open") === "true");
    } catch (_error) {
      setOpen(false);
    }

    button.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("sidebar-open"));
    });
  }

  const patientDetails = {
    anita: {
      initials: "AS",
      name: "Anita Sari",
      plan: "Mandaya Care Plus",
      identity: "45 thn • Perempuan • MRN: MRN-992103",
      status: "Care Plan Aktif",
      statusClass: "bg-mint-success/20 text-status-low",
      risk: "Risiko Disengagement Sedang",
      riskClass: "bg-status-medium/10 text-status-medium",
      bloodPressure: "135/85",
      adherence: "85%",
      insight: "Pasien melewatkan jadwal kontrol 3 hari lalu dan memiliki tren peningkatan tekanan darah ringan pada telemonitoring.",
      action: "Hubungi via WhatsApp",
      actionNote: "Tanyakan kendala kehadiran dan jadwalkan ulang secepatnya.",
      billingStatus: "Deadline mendekat",
      transactionDate: "6 Sep 2026",
      validationDeadline: "13 Sep 2026",
      validationTimeLeft: "1 hari",
      loyaltyTier: "Prestige",
      loyaltyPoints: "12.450",
      recentReward: "Tumbler Mandaya",
      rewardMethod: "Kirim ke alamat",
      rewardStatus: "Sedang diproses",
      feedbackScore: "Menunggu feedback",
      feedbackSource: "Survei WA belum dikirim",
      feedbackNote: "Action: minta feedback setelah follow-up hari ini",
      feedbackAlert: "Belum ada alert",
      latestEvent: "Jadwal kontrol terlewat",
      latestEventNote: "Konsultasi rutin Kardiologi • 3 hari lalu",
      previousEvent: "Echo jantung selesai",
      previousEventNote: "Pemeriksaan selesai pada 14 Okt 2023",
      loyaltyEvent: "Reward redeemed",
      loyaltyEventNote: "Tumbler Mandaya dipilih untuk dikirim ke alamat",
      billingEvent: "Billing validation pending",
      billingEventNote: "Window validasi H+7 berakhir besok",
      feedbackEvent: "Feedback requested",
      feedbackEventNote: "Survei NPS disiapkan setelah follow-up WA selesai",
    },
    budi: {
      initials: "BH",
      name: "Budi Hartono",
      plan: "Cardiac Remote Monitoring",
      identity: "62 thn • Laki-laki • MRN: RM-443211",
      status: "Hasil Abnormal",
      statusClass: "bg-error/10 text-error",
      risk: "Risiko Klinis Tinggi",
      riskClass: "bg-error/10 text-error",
      bloodPressure: "162/96",
      adherence: "64%",
      insight: "Hasil tekanan darah terakhir berada di atas ambang aman dan pasien melaporkan nyeri dada ringan pada check-in pagi.",
      action: "Eskalasi ke Dr. Rina",
      actionNote: "Kirim ringkasan vitals dan minta arahan pemeriksaan lanjutan hari ini.",
      billingStatus: "Sudah divalidasi",
      transactionDate: "5 Sep 2026",
      validationDeadline: "12 Sep 2026",
      validationTimeLeft: "Selesai",
      loyaltyTier: "Prestige",
      loyaltyPoints: "9.800",
      recentReward: "Mandaya Care Plus Tumbler",
      rewardMethod: "Kirim ke alamat",
      rewardStatus: "Perlu bantuan",
      feedbackScore: "2/5",
      feedbackSource: "Telepon dicatat Perawat Maya",
      feedbackNote: "Pasien mengeluhkan proses discharge dan pengiriman reward",
      feedbackAlert: "Alert recovery aktif",
      latestEvent: "Alert tekanan darah tinggi",
      latestEventNote: "Telemonitoring otomatis • 18 menit lalu",
      previousEvent: "Konsultasi jantung",
      previousEventNote: "Catatan dokter diperbarui 2 hari lalu",
      loyaltyEvent: "Delivery requested",
      loyaltyEventNote: "Pengiriman reward gagal karena alamat perlu dikonfirmasi",
      billingEvent: "Billing validated",
      billingEventNote: "Validasi Care Plus selesai oleh admin billing",
      feedbackEvent: "Feedback negatif tercatat",
      feedbackEventNote: "Skor 2/5 dari telepon follow-up memicu alert service recovery",
    },
    citra: {
      initials: "CD",
      name: "Citra Dewi",
      plan: "Maternity Follow-up",
      identity: "28 thn • Perempuan • MRN: RM-112998",
      status: "Jadwal Kontrol",
      statusClass: "bg-primary/10 text-primary",
      risk: "Risiko Disengagement Sedang",
      riskClass: "bg-status-medium/10 text-status-medium",
      bloodPressure: "118/76",
      adherence: "92%",
      insight: "Kontrol H-1 perlu dikonfirmasi karena pasien belum membuka reminder terakhir di WhatsApp.",
      action: "Konfirmasi Jadwal H-1",
      actionNote: "Pastikan pasien hadir besok dan cek kebutuhan transportasi atau pendamping.",
      billingStatus: "Belum divalidasi",
      transactionDate: "7 Sep 2026",
      validationDeadline: "14 Sep 2026",
      validationTimeLeft: "2 hari",
      loyaltyTier: "Essential",
      loyaltyPoints: "4.150",
      recentReward: "Voucher tersedia",
      rewardMethod: "Digital voucher",
      rewardStatus: "Voucher tersedia",
      feedbackScore: "4/5",
      feedbackSource: "Chat WhatsApp",
      feedbackNote: "Pasien puas dengan reminder, menunggu jadwal kontrol",
      feedbackAlert: "Normal",
      latestEvent: "Reminder belum dibaca",
      latestEventNote: "WhatsApp automation • 2 jam lalu",
      previousEvent: "USG trimester",
      previousEventNote: "Hasil normal pada kunjungan sebelumnya",
      loyaltyEvent: "Voucher issued",
      loyaltyEventNote: "Voucher digital siap digunakan di aplikasi Care Dokter",
      billingEvent: "Billing validation reminder",
      billingEventNote: "Reminder otomatis dikirim melalui Care Dokter",
      feedbackEvent: "Feedback chat diterima",
      feedbackEventNote: "Skor 4/5 masuk dari WhatsApp automation",
    },
    siti: {
      initials: "SR",
      name: "Siti Rahmawati",
      plan: "Post-op Recovery",
      identity: "42 thn • Perempuan • MRN: RM-442218",
      status: "Post-op H+3",
      statusClass: "bg-amber-100 text-amber-800",
      risk: "Risiko Recovery Sedang",
      riskClass: "bg-status-medium/10 text-status-medium",
      bloodPressure: "126/82",
      adherence: "78%",
      insight: "Skor nyeri naik dari 3 ke 6 dalam dua laporan terakhir dan pasien belum mengisi foto luka operasi hari ini.",
      action: "Kirim Kuesioner Nyeri",
      actionNote: "Minta update skala nyeri, foto luka, dan tanda infeksi sebelum eskalasi.",
      billingStatus: "Sudah divalidasi",
      transactionDate: "4 Sep 2026",
      validationDeadline: "11 Sep 2026",
      validationTimeLeft: "Selesai",
      loyaltyTier: "Prestige",
      loyaltyPoints: "11.200",
      recentReward: "Paket Recovery",
      rewardMethod: "Pickup point",
      rewardStatus: "Siap diambil",
      feedbackScore: "Menunggu feedback",
      feedbackSource: "Telepon follow-up",
      feedbackNote: "Perawat akan mencatat feedback setelah edukasi luka",
      feedbackAlert: "Belum ada alert",
      latestEvent: "Nyeri meningkat",
      latestEventNote: "Patient check-in • 45 menit lalu",
      previousEvent: "Instruksi pulang",
      previousEventNote: "Edukasi perawatan luka dikirim H+1",
      loyaltyEvent: "Reward ready",
      loyaltyEventNote: "Paket Recovery tersedia di pickup point Mandaya",
      billingEvent: "Points earned",
      billingEventNote: "Poin loyalty bertambah setelah transaksi tervalidasi",
      feedbackEvent: "Feedback pending",
      feedbackEventNote: "Survei kepuasan dijadwalkan setelah check-in H+3",
    },
    ahmad: {
      initials: "AP",
      name: "Ahmad Putra",
      plan: "Diabetes Care",
      identity: "65 thn • Laki-laki • MRN: RM-110092",
      status: "Stabil",
      statusClass: "bg-mint-success/20 text-status-low",
      risk: "Risiko Rendah",
      riskClass: "bg-mint-success/20 text-status-low",
      bloodPressure: "124/80",
      adherence: "88%",
      insight: "Parameter utama stabil, tetapi pasien melewatkan pencatatan gula darah pagi selama dua hari.",
      action: "Panggilan Pengingat",
      actionNote: "Ingatkan pencatatan gula darah pagi dan validasi stok strip test di rumah.",
      billingStatus: "Terlambat",
      transactionDate: "1 Sep 2026",
      validationDeadline: "8 Sep 2026",
      validationTimeLeft: "Lewat deadline",
      loyaltyTier: "Care",
      loyaltyPoints: "3.275",
      recentReward: "Diskon Homecare",
      rewardMethod: "Digital voucher",
      rewardStatus: "Selesai",
      feedbackScore: "3/5",
      feedbackSource: "Telepon dicatat perawat",
      feedbackNote: "Pasien netral, meminta reminder gula darah yang lebih singkat",
      feedbackAlert: "Dipantau",
      latestEvent: "Log gula darah kosong",
      latestEventNote: "Home monitoring • 1 hari lalu",
      previousEvent: "Telekonsultasi edukasi",
      previousEventNote: "Diet rendah gula dibahas minggu lalu",
      loyaltyEvent: "Reward completed",
      loyaltyEventNote: "Voucher homecare sudah digunakan pasien",
      billingEvent: "Billing overdue",
      billingEventNote: "Validasi billing melewati window H+7",
      feedbackEvent: "Feedback follow-up",
      feedbackEventNote: "Catatan telepon masuk sebagai input kualitas layanan",
    },
  };


  const followUpTasks = {
    "anita-postop": {title:"Follow-up: Anita Sari",identity:"ID: PA-2023-0892 • P, 45 Tahun",primaryIcon:"phone",primaryAction:"Telepon",scriptTitle:"Skrip follow-up pasca operasi",scriptText:'"Selamat pagi Ibu Anita, saya Maya dari Mandaya Hospital. Kami menghubungi untuk menanyakan kondisi Ibu setelah operasi 2 hari yang lalu. Apakah ada keluhan nyeri pada area jahitan, demam, atau obat yang belum cocok?"',scenarioLabel:"Prioritas Tinggi",scenarioTitle:"Pasca operasi - 48 jam",scenarioIcon:"priority_high",scenarioText:"Gunakan panggilan telepon karena task ini klinis dan butuh jawaban cepat. Bila ada nyeri berat, demam, atau luka basah, lanjutkan ke eskalasi medis.",notePlaceholder:"Catat keluhan pasien, skala nyeri, suhu tubuh, kondisi luka, dan respons terhadap obat...",sentiment:"Interaksi terakhir menunjukkan kecemasan sedang terkait nyeri pasca operasi dan pasien belum mengirim update foto luka.",context:[["Status klinis","Post-op 48 jam"],["Risiko","Prioritas tinggi"],["Channel","Telepon"]],chips:["Cek nyeri","Cek demam","Minta foto luka","Eskalasi bila merah"],history:[["Kemarin, 14:00","Pesan WhatsApp Terkirim","Panduan perawatan luka di rumah sudah dibaca pasien."],["2 Hari Lalu","Discharge dari RS","Kondisi stabil. Resep obat pereda nyeri diberikan."]],actions:[["phone","Telepon Pasien","secondary"],["chat","Kirim WhatsApp","secondary"],["warning","Eskalasi Medis","danger"],["check_circle","Tandai Selesai","primary"]]},
    "citra-feedback": {title:"Minta Feedback: Citra Dewi",identity:"ID: PA-2023-1129 • P, 28 Tahun",primaryIcon:"send",primaryAction:"Kirim Survei WA",scriptTitle:"Skrip survei NPS pasca follow-up",scriptText:'"Selamat sore Ibu Citra, terima kasih sudah memakai layanan Mandaya. Boleh kami minta penilaian singkat 1-10 untuk pengalaman follow-up hari ini? Bila ada yang kurang nyaman, kami siap bantu tindak lanjuti."',scenarioLabel:"Minta Feedback",scenarioTitle:"Survei NPS rawat jalan",scenarioIcon:"rate_review",scenarioText:"Mulai dari WhatsApp agar pasien bisa menjawab singkat. Jika tidak respons hingga sore, perawat dapat menelepon dan mencatat skor serta keluhan manual.",notePlaceholder:"Catat skor NPS, komentar pasien, sumber feedback, dan apakah perlu alert recovery...",sentiment:"Pasien responsif di chat, tetapi survei rutin belum selalu menjangkau pasien rawat jalan setelah kunjungan.",context:[["Target NPS","85%"],["Channel awal","WhatsApp"],["Skor 1-6","Buat alert"]],chips:["Kirim survei","Telepon bila sunyi","Catat skor","Buat alert jika buruk"],history:[["Hari ini, 10:20","Reminder Kontrol Dibaca","Pasien membuka reminder WhatsApp setelah 12 menit."],["Kemarin, 16:40","Follow-up selesai","Pasien bersedia memberi feedback setelah layanan selesai."]],actions:[["send","Kirim Survei WA","secondary"],["call","Catat Telepon","secondary"],["notification_important","Buat Alert Jika Buruk","danger"],["check_circle","Tandai Selesai","primary"]]},
    "anita-billing": {title:"Validasi Billing: Anita Sari",identity:"ID: PA-2023-0892 • Care Plus H+7",primaryIcon:"receipt_long",primaryAction:"Bantu Validasi",scriptTitle:"Skrip validasi billing H+7",scriptText:'"Ibu Anita, billing Care Plus Ibu masih perlu divalidasi sebelum besok pukul 23.59. Apakah Ibu sudah menerima link validasi dari Mandaya, atau ada kendala saat membukanya?"',scenarioLabel:"Validasi Billing",scenarioTitle:"Deadline billing tersisa 1 hari",scenarioIcon:"receipt_long",scenarioText:"Fokus task ini operasional, bukan klinis. Perawat membantu pasien membuka link validasi, memastikan data cocok, lalu menandai selesai untuk billing team.",notePlaceholder:"Catat apakah link diterima, kendala validasi, data yang perlu diperbaiki, dan status akhir...",sentiment:"Tidak ada sinyal klinis baru. Risiko utama ada pada validasi billing yang mendekati batas H+7.",context:[["Deadline","Besok, 23:59"],["Status","Belum validasi"],["Owner","Billing Care Plus"]],chips:["Kirim link ulang","Bantu validasi","Catat kendala","Notify billing"],history:[["Hari ini, 08:10","Link validasi terkirim","WhatsApp billing sudah dikirim, belum ada klik."],["6 Sep 2026","Transaksi Care Plus","Window validasi H+7 aktif sejak transaksi selesai."]],actions:[["chat","Kirim Link WA","secondary"],["receipt_long","Bantu Validasi","secondary"],["priority_high","Ingatkan Deadline","danger"],["check_circle","Tandai Selesai","primary"]]},
    "budi-reward": {title:"Reward Issue: Budi Hartono",identity:"ID: PA-2023-4432 • L, 62 Tahun",primaryIcon:"redeem",primaryAction:"Konfirmasi Alamat",scriptTitle:"Skrip konfirmasi reward gagal kirim",scriptText:'"Selamat siang Pak Budi, saya Maya dari Mandaya Hospital. Pengiriman reward Care Plus Tumbler belum berhasil karena alamat perlu dikonfirmasi. Apakah alamat pengiriman Bapak masih sama, atau ada patokan kurir yang perlu kami catat?"',scenarioLabel:"Reward Issue",scenarioTitle:"Delivery reward gagal",scenarioIcon:"redeem",scenarioText:"Untuk kasus ini, contoh yang muncul adalah reward issue: cek alamat, patokan kurir, nomor penerima, lalu update status agar PEO bisa memproses ulang pengiriman.",notePlaceholder:"Catat alamat baru, patokan kurir, nomor penerima, dan apakah reward dikirim ulang atau diubah pickup...",sentiment:"Feedback telepon sebelumnya bernada negatif karena pasien merasa reward Care Plus belum jelas statusnya.",context:[["Reward","Care Plus Tumbler"],["Status kirim","Gagal delivery"],["Risiko layanan","Feedback buruk"]],chips:["Konfirmasi alamat","Update nomor penerima","Ubah pickup","Buat recovery note"],history:[["Hari ini, 13:00","Delivery gagal","Kurir menandai alamat tidak lengkap dan perlu konfirmasi."],["Kemarin, 17:15","Reward redeemed","Pasien memilih Tumbler Mandaya untuk dikirim ke rumah."]],actions:[["call","Telepon Pasien","secondary"],["chat","Kirim WhatsApp","secondary"],["local_shipping","Update Pengiriman","danger"],["check_circle","Tandai Selesai","primary"]]},
    "budi-medication": {title:"Follow-up Obat: Budi Santoso",identity:"ID: PA-2023-6741 • L, 54 Tahun",primaryIcon:"chat",primaryAction:"Kirim WhatsApp",scriptTitle:"Skrip pengecekan obat rutin",scriptText:'"Pak Budi, kami ingin memastikan jadwal obat hari ini berjalan lancar. Apakah ada dosis yang terlewat, efek samping seperti pusing atau mual, atau stok obat yang hampir habis?"',scenarioLabel:"Prioritas Sedang",scenarioTitle:"Pengecekan kepatuhan obat",scenarioIcon:"medication",scenarioText:"Kasus ini cukup dimulai via WhatsApp. Jika pasien menyebut efek samping berat atau stok obat habis, buat tugas lanjutan untuk farmasi atau dokter.",notePlaceholder:"Catat dosis yang diminum, dosis terlewat, efek samping, stok obat, dan kebutuhan refill...",sentiment:"Pasien biasanya responsif via WhatsApp, risiko sedang karena ada dua hari catatan obat yang kosong.",context:[["Kepatuhan","2 log kosong"],["Channel","WhatsApp"],["Follow-up","Refill bila perlu"]],chips:["Cek dosis","Cek efek samping","Cek stok","Buat refill"],history:[["Hari ini, 07:00","Log obat kosong","Belum ada konfirmasi obat pagi."],["Kemarin","Obat malam dicatat","Pasien menandai obat malam diminum tepat waktu."]],actions:[["chat","Kirim WhatsApp","secondary"],["call","Telepon Jika Sunyi","secondary"],["medication","Buat Tugas Farmasi","danger"],["check_circle","Tandai Selesai","primary"]]},
    "citra-therapy": {title:"Reminder Fisioterapi: Citra Dewi",identity:"ID: PA-2023-1129 • Jadwal besok 09:00",primaryIcon:"event_available",primaryAction:"Konfirmasi Jadwal",scriptTitle:"Skrip reminder fisioterapi",scriptText:'"Ibu Citra, saya Maya dari Mandaya. Jadwal fisioterapi Ibu besok pukul 09.00 masih sesuai ya? Bila ada kendala transportasi atau perlu ubah jam, kami bantu koordinasikan sekarang."',scenarioLabel:"Prioritas Rendah",scenarioTitle:"Konfirmasi jadwal H-1",scenarioIcon:"event_available",scenarioText:"Task ini ringan, tujuannya mencegah no-show. Tanyakan kepastian hadir dan hambatan praktis seperti transportasi atau pendamping.",notePlaceholder:"Catat konfirmasi hadir, kebutuhan ubah jadwal, kendala transportasi, atau pendamping pasien...",sentiment:"Risiko rendah, tetapi pasien pernah terlambat membuka reminder sehingga konfirmasi H-1 tetap perlu.",context:[["Jadwal","Besok 09:00"],["Risiko","No-show rendah"],["Channel","WhatsApp"]],chips:["Konfirmasi hadir","Cek transport","Ubah jam","Kirim reminder"],history:[["Hari ini, 11:00","Reminder dibuat","AI menyiapkan pesan konfirmasi H-1."],["Minggu lalu","Sesi fisioterapi selesai","Pasien hadir dan menyelesaikan sesi latihan."]],actions:[["chat","Kirim WhatsApp","secondary"],["event_available","Ubah Jadwal","secondary"],["directions_car","Catat Kendala","danger"],["check_circle","Tandai Selesai","primary"]]},
  };

  function updatePatientDetail(patientId) {
    const patient = patientDetails[patientId];
    if (!patient) return;

    document.querySelectorAll("[data-patient-id]").forEach((row) => {
      const isActive = row.dataset.patientId === patientId;
      row.classList.toggle("is-active", isActive);
      row.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-patient-field]").forEach((field) => {
      const key = field.dataset.patientField;
      field.textContent = patient[key] || "";
    });

    const status = document.querySelector('[data-patient-field="status"]');
    const risk = document.querySelector('[data-patient-field="risk"]');
    if (status) status.className = `patient-pill ${patient.statusClass}`;
    if (risk) risk.className = `patient-pill ${patient.riskClass}`;
  }

  function setupPatientDetail() {
    const activeRow = document.querySelector(".patient-row.is-active") || document.querySelector("[data-patient-id]");
    if (activeRow) updatePatientDetail(activeRow.dataset.patientId);
  }


  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  }

  function updateFollowupWorkspace(taskId) {
    const task = followUpTasks[taskId];
    if (!task) return;
    document.querySelectorAll("[data-followup-task]").forEach((card) => {
      const active = card.dataset.followupTask === taskId;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-followup-field]").forEach((field) => {
      field.textContent = task[field.dataset.followupField] || "";
    });
    const note = document.querySelector("[data-followup-note]");
    if (note) note.placeholder = task.notePlaceholder;
    const context = document.querySelector("[data-followup-context]");
    if (context) context.innerHTML = task.context.map(([a,b]) => '<div class="flex items-start justify-between gap-3"><span class="font-body-sm text-body-sm text-on-surface-variant">' + escapeHtml(a) + '</span><span class="font-label-bold text-label-bold text-status-high text-right">' + escapeHtml(b) + '</span></div>').join("");
    const chips = document.querySelector("[data-followup-chips]");
    if (chips) chips.innerHTML = task.chips.map((chip) => '<span class="bg-primary/10 text-primary font-label-bold text-[10px] px-2 py-1 rounded-full">' + escapeHtml(chip) + '</span>').join("");
    const history = document.querySelector("[data-followup-history]");
    if (history) history.innerHTML = task.history.map(([time,title,note], i) => '<div class="relative"><div class="absolute -left-[19px] top-1 w-3 h-3 rounded-full ' + (i === 0 ? 'bg-primary' : 'bg-surface-variant border border-border-subtle') + ' ring-4 ring-surface-container-lowest"></div><div class="text-[10px] text-on-surface-variant font-label-bold mb-1">' + escapeHtml(time) + '</div><div class="bg-surface p-3 rounded-lg border border-border-subtle"><div class="font-title-sm text-title-sm text-on-surface text-[13px] mb-1">' + escapeHtml(title) + '</div><div class="font-body-sm text-body-sm text-on-surface-variant text-[12px]">' + escapeHtml(note) + '</div></div></div>').join("");
    const actions = document.querySelector("[data-followup-actions]");
    if (actions) actions.innerHTML = '<div class="followup-action-row">' + task.actions.slice(0,2).map(([icon,label,type]) => '<button class="followup-action-btn followup-action-' + type + '" type="button"><span class="material-symbols-outlined text-[18px]">' + escapeHtml(icon) + '</span>' + escapeHtml(label) + '</button>').join("") + '</div><div class="followup-action-row followup-action-row-final">' + task.actions.slice(2,4).map(([icon,label,type]) => '<button class="followup-action-btn followup-action-' + type + '" type="button"><span class="material-symbols-outlined text-[18px]">' + escapeHtml(icon) + '</span>' + escapeHtml(label) + '</button>').join("") + '</div>';
  }

  function setupFollowupWorkspace() {
    const activeTask = document.querySelector("[data-followup-task].is-active") || document.querySelector("[data-followup-task]");
    if (activeTask) updateFollowupWorkspace(activeTask.dataset.followupTask);
  }

  function renderPage(page, shouldPushState) {
    const pageData = window.MandayaPages && window.MandayaPages[page];
    const main = document.querySelector("main");

    if (!pageData || !main) {
      window.location.href = routes[page] || routes.overview;
      return;
    }

    main.outerHTML = pageData.mainHtml;
    document.title = pageData.title;
    setActivePage(page);
    setupPatientDetail();
    setupFollowupWorkspace();

    if (shouldPushState) {
      try {
        window.history.pushState({ page }, pageData.title, pageData.file);
      } catch (_error) {
        window.history.pushState({ page }, pageData.title);
      }
    }
  }

  function pageFromLocation() {
    const filename = window.location.pathname.split("/").pop();
    return (
      Object.keys(routes).find((page) => routes[page] === filename) ||
      document.body.dataset.page ||
      "overview"
    );
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-path]");
    if (!link) return;

    const page = link.dataset.path;
    if (!window.MandayaPages || !window.MandayaPages[page]) return;

    event.preventDefault();
    if (document.body.dataset.page !== page) {
      renderPage(page, true);
    }
  });

  document.addEventListener("click", (event) => {
    const task = event.target.closest("[data-followup-task]");
    if (!task) return;
    updateFollowupWorkspace(task.dataset.followupTask);
  });

  document.addEventListener("keydown", (event) => {
    const task = event.target.closest("[data-followup-task]");
    if (!task || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    updateFollowupWorkspace(task.dataset.followupTask);
  });

  document.addEventListener("click", (event) => {
    const row = event.target.closest("[data-patient-id]");
    if (!row) return;
    updatePatientDetail(row.dataset.patientId);
  });

  window.addEventListener("popstate", (event) => {
    renderPage(event.state?.page || pageFromLocation(), false);
  });

  setupSidebarToggle();
  try {
    window.history.replaceState({ page: pageFromLocation() }, document.title);
  } catch (_error) {
    // Some file:// contexts restrict History API URL changes.
  }
  setActivePage(document.body.dataset.page || pageFromLocation());
  setupPatientDetail();
  setupFollowupWorkspace();

  window.toggleInsight = function (id) {
    const row = document.getElementById(id);
    if (!row) return;
    row.classList.toggle("hidden");
  };
})();
