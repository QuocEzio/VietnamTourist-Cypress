/// <reference types="cypress"/>
describe("CRM Danh Sách Khách Hàng", () => {


    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        // Đăng nhập tài khoản
        cy.visit("https://vietnamtourist.me/login")
        var inputEmail = cy.get("#email")
        var inputPassword = cy.get("#password-input")
        var checkRememberMe = cy.get("#auth-remember-check")
        // var buttonShowPassword = cy.get("#password-addon")
        var buttonSignIn = cy.get("button[type='submit']")
        inputEmail.clear()
        inputPassword.clear()
        cy.fixture('users.json').then((user) => {
            inputEmail.type(user[0].email); // Nhập Email
            inputPassword.type(user[0].password); // Nhập Password
        });
        checkRememberMe.check({ force: true })
        // buttonShowPassword.click()
        buttonSignIn.click()

        // Vào trang CRM 
        cy.get("a[href='/crm']").click()

        // Danh sách khách hàng
        cy.get("li > a[href='/crm/customers']", { timeout: 20000 }).click()
    })


    it("Thêm mới khách hàng thuộc nhóm khách là CỘNG TÁC VIÊN vào danh sách khách hàng(Nhập Full thông tin cho các fields)", () => {


        // Thêm mới khách hàng
        cy.get("button.btn-success", { timeout: 20000 }).contains("Thêm mới").click()
        cy.get("button.btn-danger").contains("Thoát").click()
        cy.wait(2000)
        cy.get("button.btn-success").click()

        cy.wait(2000)

        // Nhóm khách hàng
        var nhomKhachHang_checkNhomKhachHang = cy.contains("legend", "Nhóm khách hàng").next()
            .contains("label", "Cộng tác viên").prev()
        nhomKhachHang_checkNhomKhachHang.check()

        // Thông tin liên hệ
        // Xưng hô
        var thongTinLienHe_checkXungHo = cy.contains("legend", "Thông tin liên hệ").next()
            .contains("label", "Chú").prev()
        thongTinLienHe_checkXungHo.check()
        // Họ tên
        var thongTinLienHe_inputHoTen = cy.contains("legend", "Họ tên").next()
            .find("input")
        thongTinLienHe_inputHoTen.type("Nguyễn Văn Tèo")
        // Điện thoại
        var thongTinLienHe_inputDienThoai = cy.contains("legend", "Điện thoại").next()
            .find("input")
        thongTinLienHe_inputDienThoai.type("0974020000")
        // Nguồn
        var thongTinLienHe_dropdownNguon = cy.contains("legend", "Nguồn").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNguon.click()
        cy.get("ul.p-dropdown-items").children().contains("Fanpage Vietnam Tourist").click()
        // Phân hạng
        var thongTinLienHe_dropdownPhanHang = cy.contains("legend", "Phân hạng").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownPhanHang.click()
        cy.get("ul.p-dropdown-items").children().contains("Vàng").click()
        // Sinh nhật
        var thongTinLienHe_inputSinhNhat = cy.contains("legend", "Sinh nhật").next()
            .find("input.p-inputtext.p-component")
        thongTinLienHe_inputSinhNhat.click()
        cy.get("button.p-datepicker-year").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev").click()
        }
        cy.get("div.p-yearpicker").children().contains("2003").click()
        cy.get("div.p-monthpicker").children().contains("Jul").click()
        cy.get("span[aria-disabled=false]").contains("16").click()
        // Số hộ chiếu
        var thongTinLienHe_inputSoHoChieu = cy.contains("legend", "Số hộ chiếu").next()
            .find("input")
        thongTinLienHe_inputSoHoChieu.type("246802468")
        // Địa chỉ
        var thongTinLienHe_inputDiaChi = cy.contains("legend", "Địa chỉ").next()
            .find("input")
        thongTinLienHe_inputDiaChi.type("Lê Đức Thọ, Gò Vấp")
        // Email
        var thongTinLienHe_inputEmail = cy.contains("legend", "Email").next()
            .find("input")
        thongTinLienHe_inputEmail.type("nguyenvanteo@gmail.com")
        // Nhân viên phụ trách
        var thongTinLienHe_dropdownNVPhuTrach = cy.contains("legend", "NV phụ trách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNVPhuTrach.click()
        cy.get("input.p-dropdown-filter").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Loại khách
        var thongTinLienHe_dropdownLoaiKhach = cy.contains("legend", "Loại khách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownLoaiKhach.click()
        cy.get("ul.p-dropdown-items").contains("Khách Mới").click()
        // Số CMND/CCCD
        var thongTinLienHe_inputSoCMND = cy.contains("legend", "Số CMND/CCCD").next()
            .find("input")
        thongTinLienHe_inputSoCMND.type("0123456789")
        // Quốc gia
        var thongTinLienHe_dropdownQuocGia = cy.contains("legend", "Quốc gia").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuocGia.click()
        cy.get("input.p-dropdown-filter").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Thành phố
        var thongTinLienHe_dropdownThanhPho = cy.contains("legend", "Thành phố").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownThanhPho.click()
        cy.get("input.p-dropdown-filter").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var thongTinLienHe_dropdownQuanHuyen = cy.contains("legend", "Quận huyện").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuanHuyen.click()
        cy.get("input.p-dropdown-filter").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()

        // // Button Thêm
        // var thongTinLienHe_buttonThem = cy.get("div.modal-footer").find("button.btn-success").contains("Thêm")
        // thongTinLienHe_buttonThem.click()

        cy.wait(5000)


    })


    it("Thêm mới khách hàng thuộc nhóm khách là ĐẠI LÝ - ĐỐI TÁC vào danh sách khách hàng(Nhập Full thông tin cho các fields)", () => {


        // Thêm mới khách hàng
        cy.get("button.btn-success", { timeout: 20000 }).contains("Thêm mới").click()
        cy.get("button.btn-danger").contains("Thoát").click()
        cy.wait(2000)
        cy.get("button.btn-success").click()

        cy.wait(2000)

        // Nhóm khách hàng
        var nhomKhachHang_checkNhomKhachHang = cy.contains("legend", "Nhóm khách hàng").next()
            .contains("label", "Đại lý - đối tác").prev()
        nhomKhachHang_checkNhomKhachHang.check()

        // Chọn công ty
        var chonCongTy_dropdownChonCongTy = cy.get("span[class='p-dropdown-label p-inputtext p-placeholder']").contains("Chọn công ty")
        chonCongTy_dropdownChonCongTy.click()
        // Thêm mới công ty
        var chonCongTy_buttonThemMoiCongTy = cy.get("ul.p-dropdown-items").children().first()
        chonCongTy_buttonThemMoiCongTy.click()
        // Tên công ty
        var thongTinDoanhNghiep_inputTenCongTy = cy.contains("legend", "Tên công ty").next()
            .find("input")
        thongTinDoanhNghiep_inputTenCongTy.type("Test Company 1")
        // Mã số thuế
        var thongTinDoanhNghiep_inputMaSoThue = cy.contains("legend", "Mã số thuế").next()
            .find("input")
        thongTinDoanhNghiep_inputMaSoThue.type("13579097531")
        // Tên thương hiệu
        var thongTinDoanhNghiep_inputTenThuongHieu = cy.contains("legend", "Tên thương hiệu").next()
            .find("input")
        thongTinDoanhNghiep_inputTenThuongHieu.type("Test Trademark 1")
        // Địa chỉ hoá đơn
        var thongTinDoanhNghiep_inputDiaChiHoaDon = cy.contains("legend", "Địa chỉ hoá đơn").next()
            .find("input")
        thongTinDoanhNghiep_inputDiaChiHoaDon.type("Invoice address 1")


        // Thông tin liên hệ
        // Xưng hô
        var thongTinLienHe_checkXungHo = cy.contains("legend", "Thông tin liên hệ").next()
            .contains("label", "Khác").prev()
        thongTinLienHe_checkXungHo.check()
        // Họ tên
        var thongTinLienHe_inputHoTen = cy.contains("legend", "Họ tên").next()
            .find("input")
        thongTinLienHe_inputHoTen.type("Nguyễn Thị Ổi")
        // Điện thoại
        var thongTinLienHe_inputDienThoai = cy.contains("legend", "Điện thoại").next()
            .find("input")
        thongTinLienHe_inputDienThoai.type("0974020000")
        // Nguồn
        var thongTinLienHe_dropdownNguon = cy.contains("legend", "Nguồn").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNguon.click()
        cy.get("ul.p-dropdown-items").children().contains("Fanpage Vietnam Tourist").click()
        // Phân hạng
        var thongTinLienHe_dropdownPhanHang = cy.contains("legend", "Phân hạng").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownPhanHang.click()
        cy.get("ul.p-dropdown-items").children().contains("Vàng").click()
        // Sinh nhật
        var thongTinLienHe_inputSinhNhat = cy.contains("legend", "Sinh nhật").next()
            .find("input.p-inputtext.p-component")
        thongTinLienHe_inputSinhNhat.click()
        cy.get("button.p-datepicker-year").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev").click()
        }
        cy.get("div.p-yearpicker").children().contains("2003").click()
        cy.get("div.p-monthpicker").children().contains("Jul").click()
        cy.get("span[aria-disabled=false]").contains("16").click()
        // Số hộ chiếu
        var thongTinLienHe_inputSoHoChieu = cy.contains("legend", "Số hộ chiếu").next()
            .find("input")
        thongTinLienHe_inputSoHoChieu.type("246802468")
        var blockThongTinLienHe = cy.get(".modal-body").children().eq(4)
        blockThongTinLienHe.within(() => {
            // Địa chỉ
            var thongTinLienHe_inputDiaChi = cy.contains("legend", "Địa chỉ").next()
                .find("input")
            thongTinLienHe_inputDiaChi.type("Lê Đức Thọ, Gò Vấp")
        })
        // Email
        var thongTinLienHe_inputEmail = cy.contains("legend", "Email").next()
            .find("input")
        thongTinLienHe_inputEmail.type("nguyenthioi@gmail.com")
        // Nhân viên phụ trách
        var thongTinLienHe_dropdownNVPhuTrach = cy.contains("legend", "NV phụ trách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNVPhuTrach.click()
        cy.get("input.p-dropdown-filter").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Loại khách
        var thongTinLienHe_dropdownLoaiKhach = cy.contains("legend", "Loại khách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownLoaiKhach.click()
        cy.get("ul.p-dropdown-items").contains("Khách Mới").click()
        // Số CMND/CCCD
        var thongTinLienHe_inputSoCMND = cy.contains("legend", "Số CMND/CCCD").next()
            .find("input")
        thongTinLienHe_inputSoCMND.type("0123456789")
        // Quốc gia
        var thongTinLienHe_dropdownQuocGia = cy.contains("legend", "Quốc gia").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuocGia.click()
        cy.get("input.p-dropdown-filter").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Thành phố
        var thongTinLienHe_dropdownThanhPho = cy.contains("legend", "Thành phố").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownThanhPho.click()
        cy.get("input.p-dropdown-filter").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var thongTinLienHe_dropdownQuanHuyen = cy.contains("legend", "Quận huyện").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuanHuyen.click()
        cy.get("input.p-dropdown-filter").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()

        // // Button Thêm
        // var thongTinLienHe_buttonThem = cy.get("div.modal-footer").find("button.btn-success").contains("Thêm")
        // thongTinLienHe_buttonThem.click()

        cy.wait(5000)


    })


    it("Thêm mới khách hàng thuộc nhóm khách là CÁ NHÂN vào danh sách khách hàng(Nhập Full thông tin cho các fields)", () => {


        // Thêm mới khách hàng
        cy.get("button.btn-success", { timeout: 20000 }).contains("Thêm mới").click()
        cy.get("button.btn-danger").contains("Thoát").click()
        cy.wait(2000)
        cy.get("button.btn-success").click()

        cy.wait(2000)

        // Nhóm khách hàng
        var nhomKhachHang_checkNhomKhachHang = cy.contains("legend", "Nhóm khách hàng").next()
            .contains("label", "Cá nhân").prev()
        nhomKhachHang_checkNhomKhachHang.check()

        // Thông tin liên hệ
        // Xưng hô
        var thongTinLienHe_checkXungHo = cy.contains("legend", "Thông tin liên hệ").next()
            .contains("label", "Cô").prev()
        thongTinLienHe_checkXungHo.check()
        // Họ tên
        var thongTinLienHe_inputHoTen = cy.contains("legend", "Họ tên").next()
            .find("input")
        thongTinLienHe_inputHoTen.type("Nguyễn Thị Bưởi")
        // Điện thoại
        var thongTinLienHe_inputDienThoai = cy.contains("legend", "Điện thoại").next()
            .find("input")
        thongTinLienHe_inputDienThoai.type("0974020000")
        // Nguồn
        var thongTinLienHe_dropdownNguon = cy.contains("legend", "Nguồn").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNguon.click()
        cy.get("ul.p-dropdown-items").children().contains("Fanpage Vietnam Tourist").click()
        // Phân hạng
        var thongTinLienHe_dropdownPhanHang = cy.contains("legend", "Phân hạng").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownPhanHang.click()
        cy.get("ul.p-dropdown-items").children().contains("Vàng").click()
        // Sinh nhật
        var thongTinLienHe_inputSinhNhat = cy.contains("legend", "Sinh nhật").next()
            .find("input.p-inputtext.p-component")
        thongTinLienHe_inputSinhNhat.click()
        cy.get("button.p-datepicker-year").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev").click()
        }
        cy.get("div.p-yearpicker").children().contains("2003").click()
        cy.get("div.p-monthpicker").children().contains("Jul").click()
        cy.get("span[aria-disabled=false]").contains("16").click()
        // Số hộ chiếu
        var thongTinLienHe_inputSoHoChieu = cy.contains("legend", "Số hộ chiếu").next()
            .find("input")
        thongTinLienHe_inputSoHoChieu.type("246802468")
        // Địa chỉ
        var thongTinLienHe_inputDiaChi = cy.contains("legend", "Địa chỉ").next()
            .find("input")
        thongTinLienHe_inputDiaChi.type("Lê Đức Thọ, Gò Vấp")
        // Email
        var thongTinLienHe_inputEmail = cy.contains("legend", "Email").next()
            .find("input")
        thongTinLienHe_inputEmail.type("nguyenthibuoi@gmail.com")
        // Nhân viên phụ trách
        var thongTinLienHe_dropdownNVPhuTrach = cy.contains("legend", "NV phụ trách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNVPhuTrach.click()
        cy.get("input.p-dropdown-filter").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Loại khách
        var thongTinLienHe_dropdownLoaiKhach = cy.contains("legend", "Loại khách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownLoaiKhach.click()
        cy.get("ul.p-dropdown-items").contains("Khách Mới").click()
        // Số CMND/CCCD
        var thongTinLienHe_inputSoCMND = cy.contains("legend", "Số CMND/CCCD").next()
            .find("input")
        thongTinLienHe_inputSoCMND.type("0123456789")
        // Quốc gia
        var thongTinLienHe_dropdownQuocGia = cy.contains("legend", "Quốc gia").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuocGia.click()
        cy.get("input.p-dropdown-filter").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Thành phố
        var thongTinLienHe_dropdownThanhPho = cy.contains("legend", "Thành phố").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownThanhPho.click()
        cy.get("input.p-dropdown-filter").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var thongTinLienHe_dropdownQuanHuyen = cy.contains("legend", "Quận huyện").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuanHuyen.click()
        cy.get("input.p-dropdown-filter").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()

        // // Button Thêm
        // var thongTinLienHe_buttonThem = cy.get("div.modal-footer").find("button.btn-success").contains("Thêm")
        // thongTinLienHe_buttonThem.click()

        cy.wait(5000)


    })


    it("Thêm mới khách hàng thuộc nhóm khách là DOANH NGHIỆP vào danh sách khách hàng(Nhập Full thông tin cho các fields)", () => {


        // Thêm mới khách hàng
        cy.get("button.btn-success", { timeout: 20000 }).contains("Thêm mới").click()
        cy.get("button.btn-danger").contains("Thoát").click()
        cy.wait(2000)
        cy.get("button.btn-success").click()

        cy.wait(2000)

        // Nhóm khách hàng
        var nhomKhachHang_checkNhomKhachHang = cy.contains("legend", "Nhóm khách hàng").next()
            .contains("label", "Doanh nghiệp").prev()
        nhomKhachHang_checkNhomKhachHang.check()

        // Chọn công ty
        var chonCongTy_dropdownChonCongTy = cy.get("span[class='p-dropdown-label p-inputtext p-placeholder']").contains("Chọn công ty")
        chonCongTy_dropdownChonCongTy.click()
        // Thêm mới công ty
        var chonCongTy_buttonThemMoiCongTy = cy.get("ul.p-dropdown-items").children().first()
        chonCongTy_buttonThemMoiCongTy.click()
        // Tên công ty
        var thongTinDoanhNghiep_inputTenCongTy = cy.contains("legend", "Tên công ty").next()
            .find("input")
        thongTinDoanhNghiep_inputTenCongTy.type("Test Company 2")
        // Mã số thuế
        var thongTinDoanhNghiep_inputMaSoThue = cy.contains("legend", "Mã số thuế").next()
            .find("input")
        thongTinDoanhNghiep_inputMaSoThue.type("13579097531")
        // Tên thương hiệu
        var thongTinDoanhNghiep_inputTenThuongHieu = cy.contains("legend", "Tên thương hiệu").next()
            .find("input")
        thongTinDoanhNghiep_inputTenThuongHieu.type("Test Trademark 2")
        // Địa chỉ hoá đơn
        var thongTinDoanhNghiep_inputDiaChiHoaDon = cy.contains("legend", "Địa chỉ hoá đơn").next()
            .find("input")
        thongTinDoanhNghiep_inputDiaChiHoaDon.type("Invoice address 2")


        // Thông tin liên hệ
        // Xưng hô
        var thongTinLienHe_checkXungHo = cy.contains("legend", "Thông tin liên hệ").next()
            .contains("label", "Bác").prev()
        thongTinLienHe_checkXungHo.check()
        // Họ tên
        var thongTinLienHe_inputHoTen = cy.contains("legend", "Họ tên").next()
            .find("input")
        thongTinLienHe_inputHoTen.type("Nguyễn Văn Cọp")
        // Điện thoại
        var thongTinLienHe_inputDienThoai = cy.contains("legend", "Điện thoại").next()
            .find("input")
        thongTinLienHe_inputDienThoai.type("0974020000")
        // Nguồn
        var thongTinLienHe_dropdownNguon = cy.contains("legend", "Nguồn").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNguon.click()
        cy.get("ul.p-dropdown-items").children().contains("Fanpage Vietnam Tourist").click()
        // Phân hạng
        var thongTinLienHe_dropdownPhanHang = cy.contains("legend", "Phân hạng").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownPhanHang.click()
        cy.get("ul.p-dropdown-items").children().contains("Vàng").click()
        // Sinh nhật
        var thongTinLienHe_inputSinhNhat = cy.contains("legend", "Sinh nhật").next()
            .find("input.p-inputtext.p-component")
        thongTinLienHe_inputSinhNhat.click()
        cy.get("button.p-datepicker-year").click()
        for (let i = 0; i < 2; i++) {
            cy.get("button.p-datepicker-prev").click()
        }
        cy.get("div.p-yearpicker").children().contains("2003").click()
        cy.get("div.p-monthpicker").children().contains("Jul").click()
        cy.get("span[aria-disabled=false]").contains("16").click()
        // Số hộ chiếu
        var thongTinLienHe_inputSoHoChieu = cy.contains("legend", "Số hộ chiếu").next()
            .find("input")
        thongTinLienHe_inputSoHoChieu.type("246802468")
        var blockThongTinLienHe = cy.get(".modal-body").children().eq(4)
        blockThongTinLienHe.within(() => {
            // Địa chỉ
            var thongTinLienHe_inputDiaChi = cy.contains("legend", "Địa chỉ").next()
                .find("input")
            thongTinLienHe_inputDiaChi.type("Lê Đức Thọ, Gò Vấp")
        })
        // Email
        var thongTinLienHe_inputEmail = cy.contains("legend", "Email").next()
            .find("input")
        thongTinLienHe_inputEmail.type("nguyenvancop@gmail.com")
        // Nhân viên phụ trách
        var thongTinLienHe_dropdownNVPhuTrach = cy.contains("legend", "NV phụ trách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownNVPhuTrach.click()
        cy.get("input.p-dropdown-filter").type("Võ Hoàng Tú")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Loại khách
        var thongTinLienHe_dropdownLoaiKhach = cy.contains("legend", "Loại khách").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownLoaiKhach.click()
        cy.get("ul.p-dropdown-items").contains("Khách Mới").click()
        // Số CMND/CCCD
        var thongTinLienHe_inputSoCMND = cy.contains("legend", "Số CMND/CCCD").next()
            .find("input")
        thongTinLienHe_inputSoCMND.type("0123456789")
        // Quốc gia
        var thongTinLienHe_dropdownQuocGia = cy.contains("legend", "Quốc gia").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuocGia.click()
        cy.get("input.p-dropdown-filter").type("Việt Nam")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Thành phố
        var thongTinLienHe_dropdownThanhPho = cy.contains("legend", "Thành phố").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownThanhPho.click()
        cy.get("input.p-dropdown-filter").type("Hồ Chí Minh")
        cy.get("ul.p-dropdown-items").children().first().click()
        // Quận huyện
        var thongTinLienHe_dropdownQuanHuyen = cy.contains("legend", "Quận huyện").next()
            .find("div.p-dropdown-trigger")
        thongTinLienHe_dropdownQuanHuyen.click()
        cy.get("input.p-dropdown-filter").type("Gò Vấp")
        cy.get("ul.p-dropdown-items").children().first().click()

        // // Button Thêm
        // var thongTinLienHe_buttonThem = cy.get("div.modal-footer").find("button.btn-success").contains("Thêm")
        // thongTinLienHe_buttonThem.click()

        cy.wait(5000)


    })

})