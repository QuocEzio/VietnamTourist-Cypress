/// <reference types="cypress"/>
describe("CRM Danh Sách Nhân Sự", () => {

    
    beforeEach(() => {
        cy.viewport(1920, 1080)
        // Đăng nhập tài khoản
        cy.visit("https://vietnamtourist.me/login")
        var inputEmail = cy.get("#email")
        var inputPassword = cy.get("#password-input")
        var checkRememberMe = cy.get("#auth-remember-check")
        var buttonShowPassword = cy.get("#password-addon")
        var buttonSignIn = cy.get("button[type='submit']")
        inputEmail.clear()
        inputPassword.clear()
        cy.fixture('users.json').then((user) => {
            inputEmail.type(user[0].email); // Nhập Email
            inputPassword.type(user[0].password); // Nhập Password
        });
        checkRememberMe.check({ force: true })
        buttonShowPassword.click()
        buttonSignIn.click()

        // Vào trang CRM 
        cy.get("a[href='/crm']").click()

        // Vào trang danh sách nhân sự
        cy.contains("span", "Quản lý nhân sự", { timeout: 20000 }).click();
        var dropdownQuanLyNhanSu = cy.get("ul[class='nav nav-sm flex-column']").children()
        dropdownQuanLyNhanSu.contains("Danh sách nhân sự").click()

    })


    it("Thêm nhân sự là HƯỚNG DẪN VIÊN vào danh sách nhân sự(Chọn dữ liệu có sẵn trong hệ thống cho các field là dropdownlist)", () => {


        // Thêm mới nhân sự
        cy.get("a[href='/crm/staff/create']", { timeout: 20000 }).click()

        cy.wait(3000)

        // Avatar nhân sự
        var avatarNhanSu = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(0)
        avatarNhanSu.selectFile("D:\\NguyenThaiQuoc\\Img\\happyFace.png", { force: true })

        // Thông tin cơ bản/Thông tin chung
        // Họ và tên
        var thongTinChung_inputHoVaTen = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        thongTinChung_inputHoVaTen.type("Test Hướng Dẫn Viên")
        // Giới tính
        var thongTinChung_dropdownGioiTinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Giới tính")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownGioiTinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nam").click()
        // Ngày sinh
        var thongTinChung_inputNgaySinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Ngày sinh")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinChung_inputNgaySinh.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev.p-link").click()
        } // Chọn giai đoạn 2000 - 2009
        cy.get("span.p-yearpicker-year").contains("2003").click()
        cy.get("span.p-monthpicker-month").contains("Jul").click()
        cy.get("span[data-p-disabled='false']").contains("16").click()
        // Nơi sinh
        var thongTinChung_inputNoiSinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nơi sinh")
            .nextUntil("input[type='text']")
        thongTinChung_inputNoiSinh.type("Bệnh viện AG")
        // Nguyên quán
        var thongTinChung_inputNguyenQuan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nguyên quán")
            .nextUntil("input[type='text']")
        thongTinChung_inputNguyenQuan.type("67-AG")
        // Tình trạng hôn nhân
        var thongTinChung_dropdownTinhTrangHonNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tình trạng hôn nhân")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownTinhTrangHonNhan.click()
        cy.get("ul.p-dropdown-items > li").contains("Đã có gia đình").click()
        // Mã số thuế cá nhân
        var thongTinChung_inputMSTCaNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "MST cá nhân")
            .nextUntil("input[type='text']")
        thongTinChung_inputMSTCaNhan.type("1234567890")
        // Thành phần gia đình
        var thongTinChung_dropdownThanhPhanGiaDinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần gia đình")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownThanhPhanGiaDinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nông dân").click()
        // Thành phần bản thân
        var thongTinChung_dropdownThanhPhanBanThan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần bản thân")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownThanhPhanBanThan.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Dân tộc
        var thongTinChung_dropdownDanToc = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Dân tộc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownDanToc.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Kinh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tôn giáo
        var thongTinChung_dropdownTonGiao = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tôn giáo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownTonGiao.click()
        cy.get("ul.p-dropdown-items > li").contains("Phật giáo").click()
        // Quốc tịch
        var thongTinChung_dropdownQuocTich = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Quốc tịch")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownQuocTich.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()

        // Thông tin cơ bản/Thông tin học vấn
        // Trình độ văn hoá
        var thongTinHocVan_dropdownTrinhDoVanHoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ văn hoá")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownTrinhDoVanHoa.click()
        cy.get("ul.p-dropdown-items > li").contains("Đại học").click()
        // Trình độ đào tạo
        var thongTinHocVan_dropdownTrinhDoDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ đào tạo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownTrinhDoDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("Đại học").click()
        // Nơi đào tạo
        var thongTinHocVan_dropdownNoiDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Nơi đào tạo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownNoiDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("ĐH Cần Thơ").click()
        // Khoa
        var thongTinHocVan_dropdownKhoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Khoa")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownKhoa.click()
        cy.get("ul.p-dropdown-items > li").contains("Khoa du lịch").click()
        // Chuyên nghành
        var thongTinHocVan_dropdownChuyenNganh = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Chuyên nghành")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownChuyenNganh.click()
        cy.get("ul.p-dropdown-items > li").contains("Quản trị kinh doanh lữ hành").click()
        // Năm tốt nghiệp
        var thongTinHocVan_inputNamTotNghiep = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Năm tốt nghiệp")
            .nextUntil("input[type='text']")
        thongTinHocVan_inputNamTotNghiep.type("2025")
        // Xếp loại
        var thongTinHocVan_dropdownXepLoai = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Xếp loại")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownXepLoai.click()
        cy.get("ul.p-dropdown-items > li").contains("Giỏi").click()

        // Thông tin cơ bản/CMND/Thẻ căn cước/Hộ chiếu
        // Loại giấy tờ
        var thongTinGiayTo_dropdownLoaiGiayTo = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Loại giấy tờ")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownLoaiGiayTo.click()
        cy.get("ul.p-dropdown-items > li").contains("CCCD").click()
        // Số CMND/CCCD
        var thongTinGiayTo_inputSoCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số CMND/CCCD")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoCMND.type("089203010000")
        // Ngày cấp (CMND/CCCD)
        var thongTinGiayTo_inputNgayCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp (CMND/CCCD)")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp (CMND/CCCD)
        var thongTinGiayTo_dropdownNoiCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp (CMND/CCCD)")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownNoiCapCMND.click()
        cy.get("ul.p-dropdown-items > li").contains("Cục Cảnh sát quản lý hành chính về trật tự xã hội").click()
        // Ngày hết hạn CMND/CCCD
        var thongTinGiayTo_inputNgayHetHanCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn CMND/CCCD")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2026").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Số hộ chiếu
        var thongTinGiayTo_inputSoHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số hộ chiếu")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoHoChieu.type("246802468")
        // Ngày cấp Hộ chiếu
        var thongTinGiayTo_inputNgayCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp Hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2023").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp hộ chiếu
        var thongTinGiayTo_dropdownNoiCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp hộ chiếu")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownNoiCapHoChieu.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Ngày hết hạn hộ chiếu
        var thongTinGiayTo_inputNgayHetHanHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2029").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ảnh CMND/CCCD mặt trước
        var thongTinGiayTo_fileCMNDMatTruoc = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(1)
        thongTinGiayTo_fileCMNDMatTruoc.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatTruoc.jpg", { force: true })
        // Ảnh CMND/CCCD mặt sau
        var thongTinGiayTo_fileCMNDMatSau = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(2)
        thongTinGiayTo_fileCMNDMatSau.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatSau.jpg", { force: true })

        // Thông tin liên hệ/Số điện thoại/Email/Khác
        // Điện thoại di động
        var soDienThoaiEmail_inputDienThoaiDiDong = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiDiDong.type("0974020000")
        // Điện thoại công ty
        var soDienThoaiEmail_inputDienThoaiCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại công ty")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiCongTy.type("0974021111")
        // Điện thoại nhà riêng
        var soDienThoaiEmail_inputDienThoaiNhaRieng = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiNhaRieng.type("0974022222")
        // Điện thoại khác
        var soDienThoaiEmail_inputDienThoaiKhac = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại khác")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiKhac.type("0974023333")
        // Email công ty
        cy.fixture('users.json').then((user) => {
            var soDienThoaiEmail_inputEmailCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
                .contains("legend", "Email công ty")
                .nextUntil("input[type='text']")
            soDienThoaiEmail_inputEmailCongTy.type(user[2].email)
        });
        // Email cá nhân
        var soDienThoaiEmail_inputEmailCaNhan = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Email cá nhân")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputEmailCaNhan.type("tester@gmail.com")
        // Facebook
        var soDienThoaiEmail_inputFacebook = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Facebook")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputFacebook.type("https://www.facebook.com")
        // Skype
        var soDienThoaiEmail_inputSkype = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Skype")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputSkype.type("https://www.skype.com")

        // Thông tin liên hệ/Quê quán
        // Quốc gia
        var queQuan_dropdownQuocGia = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var queQuan_dropdownTinhThanh = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("An Giang")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var queQuan_dropdownQuanHuyen = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Tân Châu")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var queQuan_dropdownPhuongXa = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Long Phú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var queQuan_inputDiaChi = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        queQuan_inputDiaChi.type("123, Tổ 321, Long Quới C, Long Phú, Tân Châu, An Giang, Việt Nam")

        // Thông tin liên hệ/Chỗ ở hiện nay
        // Quốc gia
        var choOHienNay_dropdownQuocGia = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var choOHienNay_dropdownTinhThanh = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var choOHienNay_dropdownQuanHuyen = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var choOHienNay_dropdownPhuongXa = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("13")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var choOHienNay_inputDiaChi = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        choOHienNay_inputDiaChi.type("12345, Lê Đức Thọ, Phường 13, Gò Vấp, TPHCM, Việt Nam")

        // Thông tin liên hệ/Liên hệ khẩn cấp
        // Họ và tên
        var lienHeKhanCap_inputHoVaTen = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputHoVaTen.type("Nguyễn Văn Tèo")
        // Quan hệ
        var lienHeKhanCap_dropdownQuanHe = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Quan hệ")
            .nextUntil("div.p-dropdown-trigger")
        lienHeKhanCap_dropdownQuanHe.click()
        cy.get("ul.p-dropdown-items > li").contains("Anh").click()
        // Điện thoại di động
        var lienHeKhanCap_inputDienThoaiDiDong = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiDiDong.type("0974024444")
        // Điện thoại nhà riêng
        var lienHeKhanCap_inputDienThoaiNhaRieng = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiNhaRieng.type("0974025555")
        // Email
        var lienHeKhanCap_inputEmail = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Email")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputEmail.type("nguyenvanteo@gmail.com")
        // Địa chỉ
        var lienHeKhanCap_inputDiaChi = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDiaChi.type("Nơi anh Tèo đang sống")

        // Thông tin công việc/Thông tin nhân viên
        // Phòng ban
        var thongTinNhanVien_dropdownPhongBan = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Phòng ban")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownPhongBan.click()
        cy.get("ul.p-dropdown-items > li").contains("PHÒNG HƯỚNG DẪN VIÊN").click()
        // Vị trí công việc
        var thongTinNhanVien_dropdownViTriCongViec = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Vị trí công việc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownViTriCongViec.click()
        cy.get("ul.p-dropdown-items > li").contains("GIÁM ĐỐC PHÒNG HƯỚNG DẪN VIÊN").click()
        // Level HDV
        var thongTinNhanVien_checkLevelHDV = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Level HDV")
            .get("div.p-rating-item")
        thongTinNhanVien_checkLevelHDV.eq(5).click()
        // Điểm hướng dẫn viên
        var thongTinNhanVien_inputDiemHDV = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Điểm hướng dẫn viên")
            .nextUntil("input[type='text']")
        thongTinNhanVien_inputDiemHDV.clear()
        thongTinNhanVien_inputDiemHDV.type("3456")
        // Thẻ hướng dẫn viên
        var thongTinNhanVien_fileTheHDV = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(3)
        thongTinNhanVien_fileTheHDV.selectFile("D:\\NguyenThaiQuoc\\Img\\theHDV.png", { force: true })
        // Chức danh
        var thongTinNhanVien_dropdownChucDanh = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Chức danh")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownChucDanh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Cấp
        var thongTinNhanVien_dropdownCap = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Cấp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownCap.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Bậc
        var thongTinNhanVien_dropdownBac = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Bậc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownBac.click()
        cy.get("ul.p-dropdown-items > li").contains("Chính thức").click()
        // Trạng thái lao động
        var thongTinNhanVien_dropdownTrangThaiLaoDong = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Trạng thái lao động")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownTrangThaiLaoDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Đang làm việc").click()

        // Thông tin công việc/Thông tin hợp đồng
        // Loại hợp đồng
        var thongTinHopDong_dropdownLoaiHopDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Loại hợp đồng")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownLoaiHopDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Hợp đồng không xác định thời hạn").click()
        // Tính chất lao động
        var thongTinHopDong_dropdownTinhChatLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Tính chất lao động")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownTinhChatLaoDong.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Chính thức")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa điểm lao động
        var thongTinHopDong_inputDiaDiemLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Địa điểm lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputDiaDiemLaoDong.type("208, Hoàng Văn Thụ, Tân Bình, TPHCM, Việt Nam")
        // Sổ sơ quản lý lao động
        var thongTinHopDong_inputSoSoQuanLyLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Sổ sơ quản lý lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputSoSoQuanLyLaoDong.type("13579013579")
        // Quản lý trực tiếp
        var thongTinHopDong_dropdownQuanLyTrucTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý trực tiếp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownQuanLyTrucTiep.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quản lý gián tiếp
        var thongTinHopDong_dropdownQuanLyGianTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý gián tiếp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownQuanLyGianTiep.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Phạm Anh Nhân")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Mã chấm công
        var thongTinHopDong_inputMaChamCong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Mã chấm công")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputMaChamCong.type("1230123")
        // Ngày học việc
        var thongTinHopDong_inputNgayHocViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày học việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayHocViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ngày thử việc
        var thongTinHopDong_inputNgayThuViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày thử việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayThuViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Feb").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày chính thức
        var thongTinHopDong_inputNgayChinhThuc = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày chính thức")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayChinhThuc.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày nghỉ hưu dự kiến
        var thongTinHopDong_inputNgayNghiHuuDuKien = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày nghỉ hưu dự kiến")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayNghiHuuDuKien.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 4; i++) {
            cy.get("button.p-datepicker-next.p-link").click()
        } // Chọn giai đoạn 2060 - 2069
        cy.get("span.p-yearpicker-year").contains("2064").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()

        // Thông tin công việc/Thông tin nghỉ việc
        // Người duyệt
        var thongTinNghiViec_dropdownNguoiDuyet = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Người duyệt")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNghiViec_dropdownNguoiDuyet.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Trần Anh Tuấn")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Ý kiến đóng góp
        var thongTinNghiViec_inputYKienDongGop = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ý kiến đóng góp")
            .nextUntil("textarea")
        thongTinNghiViec_inputYKienDongGop.type("Automation Cypress - Đóng Góp Ý Kiến")
        // Lý do nghỉ
        var thongTinNghiViec_dropdownLyDoNghi = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Lý do nghỉ")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNghiViec_dropdownLyDoNghi.click()
        cy.get("ul.p-dropdown-items > li").contains("Theo nguyện vọng").click()
        // Ngày nghỉ việc
        var thongTinNghiViec_inputNgayNghiViec = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ngày nghỉ việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinNghiViec_inputNgayNghiViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2028").click()
        cy.get("span.p-monthpicker-month").contains("Aug").click()
        cy.get("span[data-p-disabled='false']").contains("8").click()

        // Thông tin công việc/Thông tin lương
        // Bậc lương
        var thongTinLuong_inputBacLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Bậc lương")
            .nextUntil("input")
        thongTinLuong_inputBacLuong.type("1")
        // Lương cơ bản
        var thongTinLuong_inputLuongCoBan = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương cơ bản")
            .nextUntil("input")
        thongTinLuong_inputLuongCoBan.type("8888888")
        // Lương đóng bảo hiểm xã hội
        var thongTinLuong_inputLuongDongBHXH = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương đóng bảo hiểm xã hội")
            .nextUntil("input")
        thongTinLuong_inputLuongDongBHXH.type("888888")
        // Tổng lương
        var thongTinLuong_inputTongLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tổng lương")
            .nextUntil("input")
        thongTinLuong_inputTongLuong.type("8000000")
        // Tài khoản ngân hàng
        var thongTinLuong_inputTaiKhoanNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tài khoản ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputTaiKhoanNganHang.type("0974026969")
        // Ngân hàng
        var thongTinLuong_inputNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputNganHang.type("Ngân Hàng Quân Đội MBBank")

        // Thông tin công việc/Thông tin bảo hiểm
        // Tham gia bảo hiểm xã hội
        var thongTinBaoHiem_dropdownThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tham gia bảo hiểm xã hội")
            .nextUntil("div.p-dropdown-trigger")
        thongTinBaoHiem_dropdownThamGiaBHXH.click()
        cy.get("ul.p-dropdown-items > li").contains("Đang tham gia").click()
        // Ngày tham gia bảo hiểm
        var thongTinBaoHiem_inputNgayThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Ngày tham gia bảo hiểm")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinBaoHiem_inputNgayThamGiaBHXH.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Apr").click()
        cy.get("span[data-p-disabled='false']").contains("4").click()
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Số sổ bảo hiểm xã hội
        var thongTinBaoHiem_inputSoSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số sổ bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputSoSoBHXH.type("9988776655")
        // Mã số bảo hiểm xã hội
        var thongTinBaoHiem_inputMaSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Mã số bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputMaSoBHXH.type("0864208642")
        // Tỉnh cấp(Chưa có data trong field này)
        var thongTinBaoHiem_dropdownTinhCap = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉnh cấp")
            .nextUntil("div.p-dropdown-trigger")
        // Số thẻ BHYT
        var thongTinBaoHiem_inputSoTheBHYT = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số thẻ BHYT")
            .nextUntil("input")
        thongTinBaoHiem_inputSoTheBHYT.type("2233445566")
        // Nơi đăng ký KCB
        var thongTinBaoHiem_inputNoiDangKyKCB = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Nơi đăng ký KCB")
            .nextUntil("input")
        thongTinBaoHiem_inputNoiDangKyKCB.type("Bệnh viện quân y 175")

        // Thông tin tài khoản
        // Cho phép đăng nhập
        var thongTinTaiKhoan_checkChoPhepDangNhap = cy.contains("legend", "Cho phép đăng nhập").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkChoPhepDangNhap.check()
        cy.fixture('users.json').then((user) => {
            // Mật khẩu
            var thongTinTaiKhoan_inputMatKhau = cy.contains("legend", "Mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputMatKhau.type(user[2].password)
            // Nhập lại mật khẩu
            var thongTinTaiKhoan_inputNhapLaiMatKhau = cy.contains("legend", "Nhập lại mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputNhapLaiMatKhau.type(user[2].password)
        });
        // Có tất cả quyền
        var thongTinTaiKhoan_checkCoTatCaQuyen = cy.contains("legend", "Có tất cả quyền").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkCoTatCaQuyen.check()

        // Tạo mới
        var buttonTaoMoi = cy.get("button[type='submit']").contains("Tạo mới")
        buttonTaoMoi.click()

        // Xác nhận nhân sự đã được thêm vào danh sách nhân sự
        cy.fixture('users.json').then((user) => {
            cy.get(".p-datatable-tbody", { timeout: 20000 }).should("contain", user[2].email)
        });

    })


    it("Thêm nhân sự là HƯỚNG DẪN VIÊN vào danh sách nhân sự(Tạo mới dữ liệu cho các field là dropdownlist)", () => {
        // Thêm mới nhân sự
        cy.get("a[href='/crm/staff/create']", { timeout: 20000 }).click()


        // Avatar nhân sự
        var avatarNhanSu = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input",{timeout:20000}).eq(0)
        avatarNhanSu.selectFile("D:\\NguyenThaiQuoc\\Img\\happyFace.png", { force: true })

        // Thông tin cơ bản/Thông tin chung
        // Họ và tên
        var thongTinChung_inputHoVaTen = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        thongTinChung_inputHoVaTen.type("Test Hướng Dẫn Viên")
        // Giới tính
        var thongTinChung_dropdownGioiTinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Giới tính")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownGioiTinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nam").click()
        // Ngày sinh
        var thongTinChung_inputNgaySinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Ngày sinh")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinChung_inputNgaySinh.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev.p-link").click()
        } // Chọn giai đoạn 2000 - 2009
        cy.get("span.p-yearpicker-year").contains("2003").click()
        cy.get("span.p-monthpicker-month").contains("Jul").click()
        cy.get("span[data-p-disabled='false']").contains("16").click()
        // Nơi sinh
        var thongTinChung_inputNoiSinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nơi sinh")
            .nextUntil("input[type='text']")
        thongTinChung_inputNoiSinh.type("Bệnh viện AG")
        // Nguyên quán
        var thongTinChung_inputNguyenQuan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nguyên quán")
            .nextUntil("input[type='text']")
        thongTinChung_inputNguyenQuan.type("67-AG")
        // Tình trạng hôn nhân
        var thongTinChung_buttonTinhTrangHonNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tình trạng hôn nhân").next()
            .find("button[type='button']")
        thongTinChung_buttonTinhTrangHonNhan.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Đơn côi")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinChung_dropdownTinhTrangHonNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tình trạng hôn nhân")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownTinhTrangHonNhan.click()
        cy.get("ul.p-dropdown-items > li").contains("Đơn côi").click()
        // Mã số thuế cá nhân
        var thongTinChung_inputMSTCaNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "MST cá nhân")
            .nextUntil("input[type='text']")
        thongTinChung_inputMSTCaNhan.type("1234567890")
        // Thành phần gia đình
        var thongTinChung_buttonThanhPhanGiaDinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần gia đình").next()
            .find("button[type='button']")
        thongTinChung_buttonThanhPhanGiaDinh.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Thượng lưu")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinChung_dropdownThanhPhanGiaDinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần gia đình")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownThanhPhanGiaDinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Thượng lưu").click()
        // Thành phần bản thân
        var thongTinChung_buttonThanhPhanBanThan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần bản thân").next()
            .find("button[type='button']")
        thongTinChung_buttonThanhPhanBanThan.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Yêu Gia Đình")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinChung_dropdownThanhPhanBanThan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần bản thân")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownThanhPhanBanThan.click()
        cy.get("ul.p-dropdown-items > li").contains("Yêu Gia Đình").click()
        // Dân tộc
        var thongTinChung_buttonDanToc = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Dân tộc").next()
            .find("button[type='button']")
        thongTinChung_buttonDanToc.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Cờ lao")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinChung_dropdownDanToc = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Dân tộc")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownDanToc.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Cờ lao")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tôn giáo
        var thongTinChung_buttonTonGiao = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tôn giáo").next()
            .find("button[type='button']")
        thongTinChung_buttonTonGiao.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Hoà Hảo")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinChung_dropdownTonGiao = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tôn giáo")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownTonGiao.click()
        cy.get("ul.p-dropdown-items > li").contains("Hoà Hảo").click()
        // Quốc tịch
        var thongTinChung_dropdownQuocTich = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Quốc tịch")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownQuocTich.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()

        // Thông tin cơ bản/Thông tin học vấn
        // Trình độ văn hoá
        var thongTinHocVan_buttonTrinhDoVanHoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ văn hoá").next()
            .find("button[type='button']")
        thongTinHocVan_buttonTrinhDoVanHoa.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Cao Học")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownTrinhDoVanHoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ văn hoá")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownTrinhDoVanHoa.click()
        cy.get("ul.p-dropdown-items > li").contains("Cao Học").click()
        // Trình độ đào tạo
        var thongTinHocVan_buttonTrinhDoDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ đào tạo").next()
            .find("button[type='button']")
        thongTinHocVan_buttonTrinhDoDaoTao.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Sau Đại Học")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownTrinhDoDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ đào tạo")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownTrinhDoDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("Sau Đại Học").click()
        // Nơi đào tạo
        var thongTinHocVan_buttonNoiDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Nơi đào tạo").next()
            .find("button[type='button']")
        thongTinHocVan_buttonNoiDaoTao.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Đại học Mở Thành phố HCM")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownNoiDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Nơi đào tạo")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownNoiDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("Đại học Mở Thành phố HCM").click()
        // Khoa
        var thongTinHocVan_buttonKhoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Khoa").next()
            .find("button[type='button']")
        thongTinHocVan_buttonKhoa.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("MIS")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownKhoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Khoa")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownKhoa.click()
        cy.get("ul.p-dropdown-items > li").contains("MIS").click()
        // Chuyên nghành
        var thongTinHocVan_buttonChuyenNganh = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Chuyên nghành").next()
            .find("button[type='button']")
        thongTinHocVan_buttonChuyenNganh.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Hệ thống thông tin quản lý")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownChuyenNganh = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Chuyên nghành")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownChuyenNganh.click()
        cy.get("ul.p-dropdown-items > li").contains("Hệ thống thông tin quản lý").click()
        // Năm tốt nghiệp
        var thongTinHocVan_inputNamTotNghiep = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Năm tốt nghiệp")
            .nextUntil("input[type='text']")
        thongTinHocVan_inputNamTotNghiep.type("2025")
        // Xếp loại
        var thongTinHocVan_buttonXepLoai= cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Xếp loại").next()
            .find("button[type='button']")
        thongTinHocVan_buttonXepLoai.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Khá Giỏi")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHocVan_dropdownXepLoai = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Xếp loại")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHocVan_dropdownXepLoai.click()
        cy.get("ul.p-dropdown-items > li").contains("Khá Giỏi").click()

        // Thông tin cơ bản/CMND/Thẻ căn cước/Hộ chiếu
        // Loại giấy tờ
        var thongTinGiayTo_buttonLoaiGiayTo = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Loại giấy tờ").next()
            .find("button[type='button']")
        thongTinGiayTo_buttonLoaiGiayTo.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Căn Cước Công Dân")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinGiayTo_dropdownLoaiGiayTo = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Loại giấy tờ")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinGiayTo_dropdownLoaiGiayTo.click()
        cy.get("ul.p-dropdown-items > li").contains("Căn Cước Công Dân").click()
        // Số CMND/CCCD
        var thongTinGiayTo_inputSoCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số CMND/CCCD")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoCMND.type("089203010000")
        // Ngày cấp (CMND/CCCD)
        var thongTinGiayTo_inputNgayCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp (CMND/CCCD)")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp (CMND/CCCD)
        var thongTinGiayTo_buttonNoiCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp (CMND/CCCD)").next()
            .find("button[type='button']")
        thongTinGiayTo_buttonNoiCapCMND.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Cục cảnh sát tỉnh An Giang")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinGiayTo_dropdownNoiCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp (CMND/CCCD)")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinGiayTo_dropdownNoiCapCMND.click()
        cy.get("ul.p-dropdown-items > li").contains("Cục cảnh sát tỉnh An Giang").click()
        // Ngày hết hạn CMND/CCCD
        var thongTinGiayTo_inputNgayHetHanCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn CMND/CCCD")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2026").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Số hộ chiếu
        var thongTinGiayTo_inputSoHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số hộ chiếu")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoHoChieu.type("246802468")
        // Ngày cấp Hộ chiếu
        var thongTinGiayTo_inputNgayCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp Hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2023").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp hộ chiếu
        var thongTinGiayTo_dropdownNoiCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp hộ chiếu")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownNoiCapHoChieu.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Ngày hết hạn hộ chiếu
        var thongTinGiayTo_inputNgayHetHanHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2029").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ảnh CMND/CCCD mặt trước
        var thongTinGiayTo_fileCMNDMatTruoc = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(1)
        thongTinGiayTo_fileCMNDMatTruoc.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatTruoc.jpg", { force: true })
        // Ảnh CMND/CCCD mặt sau
        var thongTinGiayTo_fileCMNDMatSau = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(2)
        thongTinGiayTo_fileCMNDMatSau.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatSau.jpg", { force: true })

        // Thông tin liên hệ/Số điện thoại/Email/Khác
        // Điện thoại di động
        var soDienThoaiEmail_inputDienThoaiDiDong = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiDiDong.type("0974020000")
        // Điện thoại công ty
        var soDienThoaiEmail_inputDienThoaiCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại công ty")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiCongTy.type("0974021111")
        // Điện thoại nhà riêng
        var soDienThoaiEmail_inputDienThoaiNhaRieng = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiNhaRieng.type("0974022222")
        // Điện thoại khác
        var soDienThoaiEmail_inputDienThoaiKhac = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại khác")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiKhac.type("0974023333")
        // Email công ty
        cy.fixture('users.json').then((user) => {
            var soDienThoaiEmail_inputEmailCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
                .contains("legend", "Email công ty")
                .nextUntil("input[type='text']")
            soDienThoaiEmail_inputEmailCongTy.type(user[2].email)
        });
        // Email cá nhân
        var soDienThoaiEmail_inputEmailCaNhan = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Email cá nhân")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputEmailCaNhan.type("tester@gmail.com")
        // Facebook
        var soDienThoaiEmail_inputFacebook = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Facebook")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputFacebook.type("https://www.facebook.com")
        // Skype
        var soDienThoaiEmail_inputSkype = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Skype")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputSkype.type("https://www.skype.com")

        // Thông tin liên hệ/Quê quán
        // Quốc gia
        var queQuan_dropdownQuocGia = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var queQuan_dropdownTinhThanh = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("An Giang")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var queQuan_dropdownQuanHuyen = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Tân Châu")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var queQuan_dropdownPhuongXa = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Long Phú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var queQuan_inputDiaChi = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        queQuan_inputDiaChi.type("123, Tổ 321, Long Quới C, Long Phú, Tân Châu, An Giang, Việt Nam")

        // Thông tin liên hệ/Chỗ ở hiện nay
        // Quốc gia
        var choOHienNay_dropdownQuocGia = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var choOHienNay_dropdownTinhThanh = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var choOHienNay_dropdownQuanHuyen = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var choOHienNay_dropdownPhuongXa = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("13")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var choOHienNay_inputDiaChi = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        choOHienNay_inputDiaChi.type("12345, Lê Đức Thọ, Phường 13, Gò Vấp, TPHCM, Việt Nam")

        // Thông tin liên hệ/Liên hệ khẩn cấp
        // Họ và tên
        var lienHeKhanCap_inputHoVaTen = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputHoVaTen.type("Nguyễn Văn Tèo")
        // Quan hệ
        var lienHeKhanCap_buttonQuanHe = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Quan hệ").next()
            .find("button[type='button']")
        lienHeKhanCap_buttonQuanHe.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Cha")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var lienHeKhanCap_dropdownQuanHe = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Quan hệ")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        lienHeKhanCap_dropdownQuanHe.click()
        cy.get("ul.p-dropdown-items > li").contains("Cha").click()
        // Điện thoại di động
        var lienHeKhanCap_inputDienThoaiDiDong = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiDiDong.type("0974024444")
        // Điện thoại nhà riêng
        var lienHeKhanCap_inputDienThoaiNhaRieng = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiNhaRieng.type("0974025555")
        // Email
        var lienHeKhanCap_inputEmail = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Email")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputEmail.type("nguyenvanteo@gmail.com")
        // Địa chỉ
        var lienHeKhanCap_inputDiaChi = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDiaChi.type("Nơi anh Tèo đang sống")

        // Thông tin công việc/Thông tin nhân viên
        // Phòng ban
        var thongTinNhanVien_dropdownPhongBan = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Phòng ban")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownPhongBan.click()
        cy.get("ul.p-dropdown-items > li").contains("PHÒNG HƯỚNG DẪN VIÊN").click()
        // Vị trí công việc
        var thongTinNhanVien_dropdownViTriCongViec = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Vị trí công việc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownViTriCongViec.click()
        cy.get("ul.p-dropdown-items > li").contains("GIÁM ĐỐC PHÒNG HƯỚNG DẪN VIÊN").click()
        // Level HDV
        var thongTinNhanVien_checkLevelHDV = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Level HDV")
            .get("div.p-rating-item")
        thongTinNhanVien_checkLevelHDV.eq(5).click()
        // Điểm hướng dẫn viên
        var thongTinNhanVien_inputDiemHDV = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Điểm hướng dẫn viên")
            .nextUntil("input[type='text']")
        thongTinNhanVien_inputDiemHDV.clear()
        thongTinNhanVien_inputDiemHDV.type("3456")
        // Thẻ hướng dẫn viên
        var thongTinNhanVien_fileTheHDV = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(3)
        thongTinNhanVien_fileTheHDV.selectFile("D:\\NguyenThaiQuoc\\Img\\theHDV.png", { force: true })
        // Chức danh
        var thongTinNhanVien_buttonChucDanh = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Chức danh").next()
            .find("button[type='button']")
        thongTinNhanVien_buttonChucDanh.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Automation Tester")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinNhanVien_dropdownQuanHe = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Chức danh")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinNhanVien_dropdownQuanHe.click()
        cy.get("ul.p-dropdown-items > li").contains("Automation Tester").click()
        // Cấp
        var thongTinNhanVien_buttonCap = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Cấp").next()
            .find("button[type='button']")
        thongTinNhanVien_buttonCap.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Sinh viên thực tập")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinNhanVien_dropdownCap = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Cấp")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinNhanVien_dropdownCap.click()
        cy.get("ul.p-dropdown-items > li").contains("Sinh viên thực tập").click()
        // Bậc
        var thongTinNhanVien_buttonBac = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Bậc").next()
            .find("button[type='button']")
        thongTinNhanVien_buttonBac.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Internship")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinNhanVien_dropdownBac = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Bậc")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinNhanVien_dropdownBac.click()
        cy.get("ul.p-dropdown-items > li").contains("Internship").click()
        // Trạng thái lao động
        var thongTinNhanVien_buttonTrangThaiLaoDong = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Trạng thái lao động").next()
            .find("button[type='button']")
        thongTinNhanVien_buttonTrangThaiLaoDong.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Đang thực tập")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinNhanVien_dropdownTrangThaiLaoDong = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Trạng thái lao động")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinNhanVien_dropdownTrangThaiLaoDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Đang thực tập").click()

        // Thông tin công việc/Thông tin hợp đồng
        // Loại hợp đồng
        var thongTinHopDong_buttonLoaiHopDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Loại hợp đồng").next()
            .find("button[type='button']")
        thongTinHopDong_buttonLoaiHopDong.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Hợp đồng thực tập sinh")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinHopDong_dropdownLoaiHopDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Loại hợp đồng")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinHopDong_dropdownLoaiHopDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Hợp đồng thực tập sinh").click()
        // Tính chất lao động
        var thongTinHopDong_dropdownTinhChatLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Tính chất lao động")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownTinhChatLaoDong.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Chính thức")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa điểm lao động
        var thongTinHopDong_inputDiaDiemLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Địa điểm lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputDiaDiemLaoDong.type("208, Hoàng Văn Thụ, Tân Bình, TPHCM, Việt Nam")
        // Sổ sơ quản lý lao động
        var thongTinHopDong_inputSoSoQuanLyLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Sổ sơ quản lý lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputSoSoQuanLyLaoDong.type("13579013579")
        // Quản lý trực tiếp (Đang Status Code 500)
        var thongTinHopDong_buttonQuanLyTrucTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý trực tiếp").next()
            .find("button[type='button']")
        // thongTinHopDong_buttonQuanLyTrucTiep.click()
        // cy.wait(3000)
        // cy.contains("button", " Thêm dòng").click()
        // cy.get("div.list-unstyled").children().last().type("Direct Management")
        // cy.get("button[type='submit']").contains("Cập nhật").click()
        // var thongTinHopDong_dropdownQuanLyTrucTiep = cy.contains("h4", "Thông tin hợp đồng").next()
        //     .contains("legend", "Quản lý trực tiếp")
        //     .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        // thongTinHopDong_dropdownQuanLyTrucTiep.click()
        // cy.get("div.p-dropdown-filter-container > input[type='text']").type("Direct Management")
        // cy.get("ul.p-dropdown-items").children().first().click()
        // Quản lý gián tiếp (Đang Status Code 500)
        var thongTinHopDong_buttonQuanLyGianTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý gián tiếp").next()
            .find("button[type='button']")
        // thongTinHopDong_buttonQuanLyGianTiep.click()
        // cy.contains("button", " Thêm dòng").click()
        // cy.get("div.list-unstyled").children().last().type("Indirect Management")
        // cy.get("button[type='submit']").contains("Cập nhật").click()
        // cy.wait(3000)
        // var thongTinHopDong_dropdownQuanLyGianTiep = cy.contains("h4", "Thông tin hợp đồng").next()
        //     .contains("legend", "Quản lý gián tiếp")
        //     .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        // thongTinHopDong_dropdownQuanLyGianTiep.click()
        // cy.get("div.p-dropdown-filter-container > input[type='text']").type("Indirect Management")
        // cy.get("ul.p-dropdown-items").children().first().click()
        // Mã chấm công
        var thongTinHopDong_inputMaChamCong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Mã chấm công")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputMaChamCong.type("1230123")
        // Ngày học việc
        var thongTinHopDong_inputNgayHocViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày học việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayHocViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ngày thử việc
        var thongTinHopDong_inputNgayThuViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày thử việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayThuViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Feb").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày chính thức
        var thongTinHopDong_inputNgayChinhThuc = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày chính thức")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayChinhThuc.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày nghỉ hưu dự kiến
        var thongTinHopDong_inputNgayNghiHuuDuKien = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày nghỉ hưu dự kiến")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayNghiHuuDuKien.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 4; i++) {
            cy.get("button.p-datepicker-next.p-link").click()
        } // Chọn giai đoạn 2060 - 2069
        cy.get("span.p-yearpicker-year").contains("2064").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()

        // Thông tin công việc/Thông tin nghỉ việc
        // Người duyệt (Đang Status Code 500)
        var thongTinNghiViec_buttonNguoiDuyet = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Người duyệt").next()
            .find("button[type='button']")
        // thongTinNghiViec_buttonNguoiDuyet.click()
        // cy.contains("button", " Thêm dòng").click()
        // cy.get("div.list-unstyled").children().last().type("Reviewer")
        // cy.get("button[type='submit']").contains("Cập nhật").click()
        // cy.wait(3000)
        // var thongTinNghiViec_dropdownNguoiDuyet = cy.contains("h4", "Thông tin nghỉ việc").next()
        //     .contains("legend", "Người duyệt")
        //     .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        // thongTinNghiViec_dropdownNguoiDuyet.click()
        // cy.get("div.p-dropdown-filter-container > input[type='text']").type("Reviewer")
        // cy.get("ul.p-dropdown-items").children().first().click()
        // Ý kiến đóng góp
        var thongTinNghiViec_inputYKienDongGop = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ý kiến đóng góp")
            .nextUntil("textarea")
        thongTinNghiViec_inputYKienDongGop.type("Automation Cypress - Đóng Góp Ý Kiến")
        // Lý do nghỉ
        var thongTinNghiViec_buttonLyDoNghi = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Lý do nghỉ").next()
            .find("button[type='button']")
        thongTinNghiViec_buttonLyDoNghi.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Bệnh")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinNghiViec_dropdownLyDoNghi = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Lý do nghỉ")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinNghiViec_dropdownLyDoNghi.click()
        cy.get("ul.p-dropdown-items > li").contains("Bệnh").click()
        // Ngày nghỉ việc
        var thongTinNghiViec_inputNgayNghiViec = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ngày nghỉ việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinNghiViec_inputNgayNghiViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2028").click()
        cy.get("span.p-monthpicker-month").contains("Aug").click()
        cy.get("span[data-p-disabled='false']").contains("8").click()

        // Thông tin công việc/Thông tin lương
        // Bậc lương
        var thongTinLuong_inputBacLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Bậc lương")
            .nextUntil("input")
        thongTinLuong_inputBacLuong.type("1")
        // Lương cơ bản
        var thongTinLuong_inputLuongCoBan = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương cơ bản")
            .nextUntil("input")
        thongTinLuong_inputLuongCoBan.type("8888888")
        // Lương đóng bảo hiểm xã hội
        var thongTinLuong_inputLuongDongBHXH = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương đóng bảo hiểm xã hội")
            .nextUntil("input")
        thongTinLuong_inputLuongDongBHXH.type("888888")
        // Tổng lương
        var thongTinLuong_inputTongLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tổng lương")
            .nextUntil("input")
        thongTinLuong_inputTongLuong.type("8000000")
        // Tài khoản ngân hàng
        var thongTinLuong_inputTaiKhoanNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tài khoản ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputTaiKhoanNganHang.type("0974026969")
        // Ngân hàng
        var thongTinLuong_inputNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputNganHang.type("Ngân Hàng Quân Đội MBBank")

        // Thông tin công việc/Thông tin bảo hiểm
        // Tham gia bảo hiểm xã hội
        var thongTinBaoHiem_buttonThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tham gia bảo hiểm xã hội").next()
            .find("button[type='button']")
        thongTinBaoHiem_buttonThamGiaBHXH.click()
        cy.wait(3000)
        cy.contains("button", " Thêm dòng").click()
        cy.get("div.list-unstyled").children().last().type("Đã ngừng tham gia bảo hiểm xã hội")
        cy.get("button[type='submit']").contains("Cập nhật").click()
        var thongTinBaoHiem_dropdownThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tham gia bảo hiểm xã hội")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinBaoHiem_dropdownThamGiaBHXH.click()
        cy.get("ul.p-dropdown-items > li").contains("Đã ngừng tham gia bảo hiểm xã hội").click()
        // Ngày tham gia bảo hiểm
        var thongTinBaoHiem_inputNgayThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Ngày tham gia bảo hiểm")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinBaoHiem_inputNgayThamGiaBHXH.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Apr").click()
        cy.get("span[data-p-disabled='false']").contains("4").click()
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Số sổ bảo hiểm xã hội
        var thongTinBaoHiem_inputSoSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số sổ bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputSoSoBHXH.type("9988776655")
        // Mã số bảo hiểm xã hội
        var thongTinBaoHiem_inputMaSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Mã số bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputMaSoBHXH.type("0864208642")
        // Tỉnh cấp(Chưa có data trong field này)
        var thongTinBaoHiem_dropdownTinhCap = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉnh cấp")
            .nextUntil("div.p-dropdown-trigger")
        // Số thẻ BHYT
        var thongTinBaoHiem_inputSoTheBHYT = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số thẻ BHYT")
            .nextUntil("input")
        thongTinBaoHiem_inputSoTheBHYT.type("2233445566")
        // Nơi đăng ký KCB
        var thongTinBaoHiem_inputNoiDangKyKCB = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Nơi đăng ký KCB")
            .nextUntil("input")
        thongTinBaoHiem_inputNoiDangKyKCB.type("Bệnh viện quân y 175")

        // Thông tin tài khoản
        // Cho phép đăng nhập
        var thongTinTaiKhoan_checkChoPhepDangNhap = cy.contains("legend", "Cho phép đăng nhập").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkChoPhepDangNhap.check()
        cy.fixture('users.json').then((user) => {
            // Mật khẩu
            var thongTinTaiKhoan_inputMatKhau = cy.contains("legend", "Mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputMatKhau.type(user[2].password)
            // Nhập lại mật khẩu
            var thongTinTaiKhoan_inputNhapLaiMatKhau = cy.contains("legend", "Nhập lại mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputNhapLaiMatKhau.type(user[2].password)
        });
        // Có tất cả quyền
        var thongTinTaiKhoan_checkCoTatCaQuyen = cy.contains("legend", "Có tất cả quyền").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkCoTatCaQuyen.check()

        // Tạo mới
        var buttonTaoMoi = cy.get("button[type='submit']").contains("Tạo mới")
        buttonTaoMoi.click()

        // Xác nhận nhân sự đã được thêm vào danh sách nhân sự
        cy.fixture('users.json').then((user) => {
            cy.get(".p-datatable-tbody", { timeout: 20000 }).should("contain", user[2].email)
        });

    })

    it("Thêm nhân sự KHÔNG PHẢI là HƯỚNG DẪN VIÊN vào danh sách nhân sự(Chọn dữ liệu có sẵn trong hệ thống cho các field là dropdownlist)", () => {


        // Thêm mới nhân sự
        cy.get("a[href='/crm/staff/create']", { timeout: 20000 }).click()

        cy.wait(3000)

        // Avatar nhân sự
        var avatarNhanSu = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(0)
        avatarNhanSu.selectFile("D:\\NguyenThaiQuoc\\Img\\happyFace.png", { force: true })

        // Thông tin cơ bản/Thông tin chung
        // Họ và tên
        var thongTinChung_inputHoVaTen = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        thongTinChung_inputHoVaTen.type("Test Non Hướng Dẫn Viên")
        // Giới tính
        var thongTinChung_dropdownGioiTinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Giới tính")
            .nextUntil("span[class='p-dropdown-label p-inputtext p-placeholder']")
        thongTinChung_dropdownGioiTinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nam").click()
        // Ngày sinh
        var thongTinChung_inputNgaySinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Ngày sinh")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinChung_inputNgaySinh.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev.p-link").click()
        } // Chọn giai đoạn 2000 - 2009
        cy.get("span.p-yearpicker-year").contains("2003").click()
        cy.get("span.p-monthpicker-month").contains("Jul").click()
        cy.get("span[data-p-disabled='false']").contains("16").click()
        // Nơi sinh
        var thongTinChung_inputNoiSinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nơi sinh")
            .nextUntil("input[type='text']")
        thongTinChung_inputNoiSinh.type("Bệnh viện AG")
        // Nguyên quán
        var thongTinChung_inputNguyenQuan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Nguyên quán")
            .nextUntil("input[type='text']")
        thongTinChung_inputNguyenQuan.type("67-AG")
        // Tình trạng hôn nhân
        var thongTinChung_dropdownTinhTrangHonNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tình trạng hôn nhân")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownTinhTrangHonNhan.click()
        cy.get("ul.p-dropdown-items > li").contains("Đã có gia đình").click()
        // Mã số thuế cá nhân
        var thongTinChung_inputMSTCaNhan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "MST cá nhân")
            .nextUntil("input[type='text']")
        thongTinChung_inputMSTCaNhan.type("1234567890")
        // Thành phần gia đình
        var thongTinChung_dropdownThanhPhanGiaDinh = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần gia đình")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownThanhPhanGiaDinh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nông dân").click()
        // Thành phần bản thân
        var thongTinChung_dropdownThanhPhanBanThan = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Thành phần bản thân")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownThanhPhanBanThan.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Dân tộc
        var thongTinChung_dropdownDanToc = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Dân tộc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownDanToc.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Kinh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tôn giáo
        var thongTinChung_dropdownTonGiao = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Tôn giáo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownTonGiao.click()
        cy.get("ul.p-dropdown-items > li").contains("Phật giáo").click()
        // Quốc tịch
        var thongTinChung_dropdownQuocTich = cy.contains("h4", "Thông tin chung").next()
            .contains("legend", "Quốc tịch")
            .nextUntil("div.p-dropdown-trigger")
        thongTinChung_dropdownQuocTich.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()

        // Thông tin cơ bản/Thông tin học vấn
        // Trình độ văn hoá
        var thongTinHocVan_dropdownTrinhDoVanHoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ văn hoá")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownTrinhDoVanHoa.click()
        cy.get("ul.p-dropdown-items > li").contains("Đại học").click()
        // Trình độ đào tạo
        var thongTinHocVan_dropdownTrinhDoDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Trình độ đào tạo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownTrinhDoDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("Đại học").click()
        // Nơi đào tạo
        var thongTinHocVan_dropdownNoiDaoTao = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Nơi đào tạo")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownNoiDaoTao.click()
        cy.get("ul.p-dropdown-items > li").contains("ĐH Cần Thơ").click()
        // Khoa
        var thongTinHocVan_dropdownKhoa = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Khoa")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownKhoa.click()
        cy.get("ul.p-dropdown-items > li").contains("Khoa du lịch").click()
        // Chuyên nghành
        var thongTinHocVan_dropdownChuyenNganh = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Chuyên nghành")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownChuyenNganh.click()
        cy.get("ul.p-dropdown-items > li").contains("Quản trị kinh doanh lữ hành").click()
        // Năm tốt nghiệp
        var thongTinHocVan_inputNamTotNghiep = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Năm tốt nghiệp")
            .nextUntil("input[type='text']")
        thongTinHocVan_inputNamTotNghiep.type("2025")
        // Xếp loại
        var thongTinHocVan_dropdownXepLoai = cy.contains("h4", "Thông tin học vấn").next()
            .contains("legend", "Xếp loại")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHocVan_dropdownXepLoai.click()
        cy.get("ul.p-dropdown-items > li").contains("Giỏi").click()

        // Thông tin cơ bản/CMND/Thẻ căn cước/Hộ chiếu
        // Loại giấy tờ
        var thongTinGiayTo_dropdownLoaiGiayTo = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Loại giấy tờ")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownLoaiGiayTo.click()
        cy.get("ul.p-dropdown-items > li").contains("CCCD").click()
        // Số CMND/CCCD
        var thongTinGiayTo_inputSoCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số CMND/CCCD")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoCMND.type("089203010000")
        // Ngày cấp (CMND/CCCD)
        var thongTinGiayTo_inputNgayCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp (CMND/CCCD)")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp (CMND/CCCD)
        var thongTinGiayTo_dropdownNoiCapCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp (CMND/CCCD)")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownNoiCapCMND.click()
        cy.get("ul.p-dropdown-items > li").contains("Cục Cảnh sát quản lý hành chính về trật tự xã hội").click()
        // Ngày hết hạn CMND/CCCD
        var thongTinGiayTo_inputNgayHetHanCMND = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn CMND/CCCD")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanCMND.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2026").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Số hộ chiếu
        var thongTinGiayTo_inputSoHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Số hộ chiếu")
            .nextUntil("input[type='text']")
        thongTinGiayTo_inputSoHoChieu.type("246802468")
        // Ngày cấp Hộ chiếu
        var thongTinGiayTo_inputNgayCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày cấp Hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayCapHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2023").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Nơi cấp hộ chiếu
        var thongTinGiayTo_dropdownNoiCapHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Nơi cấp hộ chiếu")
            .nextUntil("div.p-dropdown-trigger")
        thongTinGiayTo_dropdownNoiCapHoChieu.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Ngày hết hạn hộ chiếu
        var thongTinGiayTo_inputNgayHetHanHoChieu = cy.contains("h4", "CMND/Thẻ căn cước/Hộ chiếu").next()
            .contains("legend", "Ngày hết hạn hộ chiếu")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinGiayTo_inputNgayHetHanHoChieu.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2029").click()
        cy.get("span.p-monthpicker-month").contains("Dec").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ảnh CMND/CCCD mặt trước
        var thongTinGiayTo_fileCMNDMatTruoc = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(1)
        thongTinGiayTo_fileCMNDMatTruoc.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatTruoc.jpg", { force: true })
        // Ảnh CMND/CCCD mặt sau
        var thongTinGiayTo_fileCMNDMatSau = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(2)
        thongTinGiayTo_fileCMNDMatSau.selectFile("D:\\NguyenThaiQuoc\\Img\\cccdMatSau.jpg", { force: true })

        // Thông tin liên hệ/Số điện thoại/Email/Khác
        // Điện thoại di động
        var soDienThoaiEmail_inputDienThoaiDiDong = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiDiDong.type("0974020000")
        // Điện thoại công ty
        var soDienThoaiEmail_inputDienThoaiCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại công ty")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiCongTy.type("0974021111")
        // Điện thoại nhà riêng
        var soDienThoaiEmail_inputDienThoaiNhaRieng = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiNhaRieng.type("0974022222")
        // Điện thoại khác
        var soDienThoaiEmail_inputDienThoaiKhac = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Điện thoại khác")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputDienThoaiKhac.type("0974023333")
        // Email công ty
        cy.fixture('users.json').then((user) => {
            var soDienThoaiEmail_inputEmailCongTy = cy.contains("h4", "Số điện thoại/Email/Khác").next()
                .contains("legend", "Email công ty")
                .nextUntil("input[type='text']")
            soDienThoaiEmail_inputEmailCongTy.type(user[3].email)
        });
        // Email cá nhân
        var soDienThoaiEmail_inputEmailCaNhan = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Email cá nhân")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputEmailCaNhan.type("tester@gmail.com")
        // Facebook
        var soDienThoaiEmail_inputFacebook = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Facebook")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputFacebook.type("https://www.facebook.com")
        // Skype
        var soDienThoaiEmail_inputSkype = cy.contains("h4", "Số điện thoại/Email/Khác").next()
            .contains("legend", "Skype")
            .nextUntil("input[type='text']")
        soDienThoaiEmail_inputSkype.type("https://www.skype.com")

        // Thông tin liên hệ/Quê quán
        // Quốc gia
        var queQuan_dropdownQuocGia = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var queQuan_dropdownTinhThanh = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("An Giang")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var queQuan_dropdownQuanHuyen = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Tân Châu")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var queQuan_dropdownPhuongXa = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        queQuan_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Long Phú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var queQuan_inputDiaChi = cy.contains("h4", "Quê quán").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        queQuan_inputDiaChi.type("123, Tổ 321, Long Quới C, Long Phú, Tân Châu, An Giang, Việt Nam")

        // Thông tin liên hệ/Chỗ ở hiện nay
        // Quốc gia
        var choOHienNay_dropdownQuocGia = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quốc gia")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuocGia.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Tỉnh thành
        var choOHienNay_dropdownTinhThanh = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Tỉnh thành")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownTinhThanh.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var choOHienNay_dropdownQuanHuyen = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Quận huyện")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownQuanHuyen.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Phường xã
        var choOHienNay_dropdownPhuongXa = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Phường xã")
            .nextUntil("div.p-dropdown-trigger")
        choOHienNay_dropdownPhuongXa.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("13")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa chỉ
        var choOHienNay_inputDiaChi = cy.contains("h4", "Chỗ ở hiện nay").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        choOHienNay_inputDiaChi.type("12345, Lê Đức Thọ, Phường 13, Gò Vấp, TPHCM, Việt Nam")

        // Thông tin liên hệ/Liên hệ khẩn cấp
        // Họ và tên
        var lienHeKhanCap_inputHoVaTen = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Họ và tên")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputHoVaTen.type("Nguyễn Văn Tèo")
        // Quan hệ
        var lienHeKhanCap_dropdownQuanHe = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Quan hệ")
            .nextUntil("div.p-dropdown-trigger")
        lienHeKhanCap_dropdownQuanHe.click()
        cy.get("ul.p-dropdown-items > li").contains("Anh").click()
        // Điện thoại di động
        var lienHeKhanCap_inputDienThoaiDiDong = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại di động")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiDiDong.type("0974024444")
        // Điện thoại nhà riêng
        var lienHeKhanCap_inputDienThoaiNhaRieng = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Điện thoại nhà riêng")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDienThoaiNhaRieng.type("0974025555")
        // Email
        var lienHeKhanCap_inputEmail = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Email")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputEmail.type("nguyenvanteo@gmail.com")
        // Địa chỉ
        var lienHeKhanCap_inputDiaChi = cy.contains("h4", "Liên hệ khẩn cấp").next()
            .contains("legend", "Địa chỉ")
            .nextUntil("input[type='text']")
        lienHeKhanCap_inputDiaChi.type("Nơi anh Tèo đang sống")

        // Thông tin công việc/Thông tin nhân viên
        // Phòng ban
        var thongTinNhanVien_dropdownPhongBan = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Phòng ban")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownPhongBan.click()
        cy.get("ul.p-dropdown-items > li").contains("PHÒNG GIÁM SÁT").click()
        // Vị trí công việc
        var thongTinNhanVien_dropdownViTriCongViec = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Vị trí công việc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownViTriCongViec.click()
        cy.get("ul.p-dropdown-items > li").contains("GIÁM SÁT HỆ THỐNG").click()
        // // Level HDV
        // var thongTinNhanVien_checkLevelHDV = cy.contains("h4", "Thông tin nhân viên").next()
        //     .contains("legend", "Level HDV")
        //     .get("div.p-rating-item")
        // thongTinNhanVien_checkLevelHDV.eq(5).click()
        // // Điểm hướng dẫn viên
        // var thongTinNhanVien_inputDiemHDV = cy.contains("h4", "Thông tin nhân viên").next()
        //     .contains("legend", "Điểm hướng dẫn viên")
        //     .nextUntil("input[type='text']")
        // thongTinNhanVien_inputDiemHDV.clear()
        // thongTinNhanVien_inputDiemHDV.type("3456")
        // // Thẻ hướng dẫn viên
        // var thongTinNhanVien_fileTheHDV = cy.get("div[class='avatar-xs p-0 rounded-circle profile-photo-edit'] > input.profile-img-file-input").eq(3)
        // thongTinNhanVien_fileTheHDV.selectFile("D:\\NguyenThaiQuoc\\Img\\theHDV.png", { force: true })
        // Chức danh
        var thongTinNhanVien_dropdownChucDanh = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Chức danh")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownChucDanh.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Cấp
        var thongTinNhanVien_dropdownCap = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Cấp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownCap.click()
        cy.get("ul.p-dropdown-items > li").contains("Nhân viên").click()
        // Bậc
        var thongTinNhanVien_dropdownBac = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Bậc")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownBac.click()
        cy.get("ul.p-dropdown-items > li").contains("Chính thức").click()
        // Trạng thái lao động
        var thongTinNhanVien_dropdownTrangThaiLaoDong = cy.contains("h4", "Thông tin nhân viên").next()
            .contains("legend", "Trạng thái lao động")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNhanVien_dropdownTrangThaiLaoDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Đang làm việc").click()

        // Thông tin công việc/Thông tin hợp đồng
        // Loại hợp đồng
        var thongTinHopDong_dropdownLoaiHopDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Loại hợp đồng")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownLoaiHopDong.click()
        cy.get("ul.p-dropdown-items > li").contains("Hợp đồng không xác định thời hạn").click()
        // Tính chất lao động
        var thongTinHopDong_dropdownTinhChatLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Tính chất lao động")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownTinhChatLaoDong.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Chính thức")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Địa điểm lao động
        var thongTinHopDong_inputDiaDiemLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Địa điểm lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputDiaDiemLaoDong.type("208, Hoàng Văn Thụ, Tân Bình, TPHCM, Việt Nam")
        // Sổ sơ quản lý lao động
        var thongTinHopDong_inputSoSoQuanLyLaoDong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Sổ sơ quản lý lao động")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputSoSoQuanLyLaoDong.type("13579013579")
        // Quản lý trực tiếp
        var thongTinHopDong_dropdownQuanLyTrucTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý trực tiếp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownQuanLyTrucTiep.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quản lý gián tiếp
        var thongTinHopDong_dropdownQuanLyGianTiep = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Quản lý gián tiếp")
            .nextUntil("div.p-dropdown-trigger")
        thongTinHopDong_dropdownQuanLyGianTiep.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Phạm Anh Nhân")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Mã chấm công
        var thongTinHopDong_inputMaChamCong = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Mã chấm công")
            .nextUntil("input[type='text']")
        thongTinHopDong_inputMaChamCong.type("1230123")
        // Ngày học việc
        var thongTinHopDong_inputNgayHocViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày học việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayHocViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Jan").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()
        // Ngày thử việc
        var thongTinHopDong_inputNgayThuViec = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày thử việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-input-icon']")
        thongTinHopDong_inputNgayThuViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Feb").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày chính thức
        var thongTinHopDong_inputNgayChinhThuc = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày chính thức")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayChinhThuc.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("1").click()
        // Ngày nghỉ hưu dự kiến
        var thongTinHopDong_inputNgayNghiHuuDuKien = cy.contains("h4", "Thông tin hợp đồng").next()
            .contains("legend", "Ngày nghỉ hưu dự kiến")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinHopDong_inputNgayNghiHuuDuKien.click()
        cy.get("button.p-datepicker-year.p-link").click()
        for (let i = 0; i < 4; i++) {
            cy.get("button.p-datepicker-next.p-link").click()
        } // Chọn giai đoạn 2060 - 2069
        cy.get("span.p-yearpicker-year").contains("2064").click()
        cy.get("span.p-monthpicker-month").contains("Mar").click()
        cy.get("span[data-p-disabled='false']").contains("31").click()

        // Thông tin công việc/Thông tin nghỉ việc
        // Người duyệt
        var thongTinNghiViec_dropdownNguoiDuyet = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Người duyệt")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNghiViec_dropdownNguoiDuyet.click()
        cy.get("div.p-dropdown-filter-container > input[type='text']").type("Trần Anh Tuấn")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Ý kiến đóng góp
        var thongTinNghiViec_inputYKienDongGop = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ý kiến đóng góp")
            .nextUntil("textarea")
        thongTinNghiViec_inputYKienDongGop.type("Automation Cypress - Đóng Góp Ý Kiến")
        // Lý do nghỉ
        var thongTinNghiViec_dropdownLyDoNghi = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Lý do nghỉ")
            .nextUntil("div.p-dropdown-trigger")
        thongTinNghiViec_dropdownLyDoNghi.click()
        cy.get("ul.p-dropdown-items > li").contains("Theo nguyện vọng").click()
        // Ngày nghỉ việc
        var thongTinNghiViec_inputNgayNghiViec = cy.contains("h4", "Thông tin nghỉ việc").next()
            .contains("legend", "Ngày nghỉ việc")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinNghiViec_inputNgayNghiViec.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2028").click()
        cy.get("span.p-monthpicker-month").contains("Aug").click()
        cy.get("span[data-p-disabled='false']").contains("8").click()

        // Thông tin công việc/Thông tin lương
        // Bậc lương
        var thongTinLuong_inputBacLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Bậc lương")
            .nextUntil("input")
        thongTinLuong_inputBacLuong.type("1")
        // Lương cơ bản
        var thongTinLuong_inputLuongCoBan = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương cơ bản")
            .nextUntil("input")
        thongTinLuong_inputLuongCoBan.type("8888888")
        // Lương đóng bảo hiểm xã hội
        var thongTinLuong_inputLuongDongBHXH = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Lương đóng bảo hiểm xã hội")
            .nextUntil("input")
        thongTinLuong_inputLuongDongBHXH.type("888888")
        // Tổng lương
        var thongTinLuong_inputTongLuong = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tổng lương")
            .nextUntil("input")
        thongTinLuong_inputTongLuong.type("8000000")
        // Tài khoản ngân hàng
        var thongTinLuong_inputTaiKhoanNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Tài khoản ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputTaiKhoanNganHang.type("0974026969")
        // Ngân hàng
        var thongTinLuong_inputNganHang = cy.contains("h4", "Thông tin lương").next()
            .contains("legend", "Ngân hàng")
            .nextUntil("input")
        thongTinLuong_inputNganHang.type("Ngân Hàng Quân Đội MBBank")

        // Thông tin công việc/Thông tin bảo hiểm
        // Tham gia bảo hiểm xã hội
        var thongTinBaoHiem_dropdownThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tham gia bảo hiểm xã hội")
            .nextUntil("div.p-dropdown-trigger")
        thongTinBaoHiem_dropdownThamGiaBHXH.click()
        cy.get("ul.p-dropdown-items > li").contains("Đang tham gia").click()
        // Ngày tham gia bảo hiểm
        var thongTinBaoHiem_inputNgayThamGiaBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Ngày tham gia bảo hiểm")
            .nextUntil("svg[class='p-icon p-datepicker-trigger-icon p-inpu  t-icon']")
        thongTinBaoHiem_inputNgayThamGiaBHXH.click()
        cy.get("button.p-datepicker-year.p-link").click()
        cy.get("span.p-yearpicker-year").contains("2024").click()
        cy.get("span.p-monthpicker-month").contains("Apr").click()
        cy.get("span[data-p-disabled='false']").contains("4").click()
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Tỉ lệ đóng bảo hiểm
        var thongTinBaoHiem_inputTiLeDongBH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉ lệ đóng bảo hiểm")
            .nextUntil("input")
        thongTinBaoHiem_inputTiLeDongBH.type("100")
        // Số sổ bảo hiểm xã hội
        var thongTinBaoHiem_inputSoSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số sổ bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputSoSoBHXH.type("9988776655")
        // Mã số bảo hiểm xã hội
        var thongTinBaoHiem_inputMaSoBHXH = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Mã số bảo hiểm xã hội")
            .nextUntil("input")
        thongTinBaoHiem_inputMaSoBHXH.type("0864208642")
        // Tỉnh cấp(Chưa có data trong field này)
        var thongTinBaoHiem_dropdownTinhCap = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Tỉnh cấp")
            .nextUntil("div.p-dropdown-trigger")
        // Số thẻ BHYT
        var thongTinBaoHiem_inputSoTheBHYT = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Số thẻ BHYT")
            .nextUntil("input")
        thongTinBaoHiem_inputSoTheBHYT.type("2233445566")
        // Nơi đăng ký KCB
        var thongTinBaoHiem_inputNoiDangKyKCB = cy.contains("h4", "Thông tin bảo hiểm").next()
            .contains("legend", "Nơi đăng ký KCB")
            .nextUntil("input")
        thongTinBaoHiem_inputNoiDangKyKCB.type("Bệnh viện quân y 175")

        // Thông tin tài khoản
        // Cho phép đăng nhập
        var thongTinTaiKhoan_checkChoPhepDangNhap = cy.contains("legend", "Cho phép đăng nhập").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkChoPhepDangNhap.check()
        cy.fixture('users.json').then((user) => {
            // Mật khẩu
            var thongTinTaiKhoan_inputMatKhau = cy.contains("legend", "Mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputMatKhau.type(user[3].password)
            // Nhập lại mật khẩu
            var thongTinTaiKhoan_inputNhapLaiMatKhau = cy.contains("legend", "Nhập lại mật khẩu").next()
                .find("input[type='password']")
            thongTinTaiKhoan_inputNhapLaiMatKhau.type(user[3].password)
        });
        // Có tất cả quyền
        var thongTinTaiKhoan_checkCoTatCaQuyen = cy.contains("legend", "Có tất cả quyền").next()
            .find("input#checkbox-1")
        thongTinTaiKhoan_checkCoTatCaQuyen.check()

        // Tạo mới
        var buttonTaoMoi = cy.get("button[type='submit']").contains("Tạo mới")
        buttonTaoMoi.click()

        // Xác nhận nhân sự đã được thêm vào danh sách nhân sự
        cy.fixture('users.json').then((user) => {
            cy.get(".p-datatable-tbody", { timeout: 20000 }).should("contain", user[3].email)
        });

    })

})