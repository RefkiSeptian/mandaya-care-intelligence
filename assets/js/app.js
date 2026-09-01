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
      latestEvent: "Jadwal kontrol terlewat",
      latestEventNote: "Konsultasi rutin Kardiologi • 3 hari lalu",
      previousEvent: "Echo jantung selesai",
      previousEventNote: "Pemeriksaan selesai pada 14 Okt 2023",
      loyaltyEvent: "Reward redeemed",
      loyaltyEventNote: "Tumbler Mandaya dipilih untuk dikirim ke alamat",
      billingEvent: "Billing validation pending",
      billingEventNote: "Window validasi H+7 berakhir besok",
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
      latestEvent: "Alert tekanan darah tinggi",
      latestEventNote: "Telemonitoring otomatis • 18 menit lalu",
      previousEvent: "Konsultasi jantung",
      previousEventNote: "Catatan dokter diperbarui 2 hari lalu",
      loyaltyEvent: "Delivery requested",
      loyaltyEventNote: "Pengiriman reward gagal karena alamat perlu dikonfirmasi",
      billingEvent: "Billing validated",
      billingEventNote: "Validasi Care Plus selesai oleh admin billing",
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
      latestEvent: "Reminder belum dibaca",
      latestEventNote: "WhatsApp automation • 2 jam lalu",
      previousEvent: "USG trimester",
      previousEventNote: "Hasil normal pada kunjungan sebelumnya",
      loyaltyEvent: "Voucher issued",
      loyaltyEventNote: "Voucher digital siap digunakan di aplikasi Care Dokter",
      billingEvent: "Billing validation reminder",
      billingEventNote: "Reminder otomatis dikirim melalui Care Dokter",
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
      latestEvent: "Nyeri meningkat",
      latestEventNote: "Patient check-in • 45 menit lalu",
      previousEvent: "Instruksi pulang",
      previousEventNote: "Edukasi perawatan luka dikirim H+1",
      loyaltyEvent: "Reward ready",
      loyaltyEventNote: "Paket Recovery tersedia di pickup point Mandaya",
      billingEvent: "Points earned",
      billingEventNote: "Poin loyalty bertambah setelah transaksi tervalidasi",
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
      latestEvent: "Log gula darah kosong",
      latestEventNote: "Home monitoring • 1 hari lalu",
      previousEvent: "Telekonsultasi edukasi",
      previousEventNote: "Diet rendah gula dibahas minggu lalu",
      loyaltyEvent: "Reward completed",
      loyaltyEventNote: "Voucher homecare sudah digunakan pasien",
      billingEvent: "Billing overdue",
      billingEventNote: "Validasi billing melewati window H+7",
    },
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

  window.toggleInsight = function (id) {
    const row = document.getElementById(id);
    if (!row) return;
    row.classList.toggle("hidden");
  };
})();
