import os
import sys
import subprocess
import time

def in_tieu_de(tieu_de):
    print("\n" + "=" * 80)
    print(f" {tieu_de}".center(80))
    print("=" * 80)

def chay_lenh(ten_buoc, cmd, cwd=None, env=None):
    print(f"\n[>] Đang thực hiện: {ten_buoc}...")
    bat_dau = time.time()
    moi_truong = os.environ.copy()
    moi_truong["PYTHONIOENCODING"] = "utf-8"
    if env:
        moi_truong.update(env)

    ket_qua = subprocess.run(
        cmd,
        cwd=cwd,
        env=moi_truong,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True,
        encoding="utf-8",
        errors="replace"
    )
    thoi_gian = time.time() - bat_dau
    dat = (ket_qua.returncode == 0)

    if dat:
        print(f"    --> ĐẠT ({thoi_gian:.2f}s)")
    else:
        print(f"    --> THẤT BẠI ({thoi_gian:.2f}s)")
        print("\n--- CHI TIẾT LỖI ---")
        lines = ket_qua.stdout.strip().split("\n")
        print("\n".join(lines[-25:] if len(lines) > 25 else lines))
        print("--------------------\n")

    return dat, thoi_gian, ket_qua.stdout

def main():
    goc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    frontend_dir = os.path.join(goc, "src", "frontend")
    backend_dir = os.path.join(goc, "src", "backend")

    in_tieu_de("BỘ KIỂM TRA HỆ THỐNG TOÀN DIỆN THESISHUB (PRE-PUSH VERIFICATION)")

    cac_buoc = [
        ("Kiểm tra Sơ đồ & Đặc tả Mốc M2", f'python scripts/kiem_moc.py M2 "{goc}"', goc),
        ("Kiểm tra Quy chuẩn Gói 3 & Bút danh ẩn danh", "python scripts/kiem_goi.py --goi 3", goc),
        ("Kiểm thử Tự động Logic Nghiệp vụ & Bất biến (Pytest)", "python -m pytest tests -v", goc),
        ("Đóng gói Kiểm tra Giao diện Frontend (Vite Build)", "npm.cmd run build", frontend_dir),
        ("Kiểm tra Biên dịch & Test Backend (Spring Boot)", "mvnw.cmd test-compile", backend_dir)
    ]

    tong_hop = []
    co_loi = False

    for ten, cmd, cwd in cac_buoc:
        dat, thoi_gian, out = chay_lenh(ten, cmd, cwd=cwd)
        tong_hop.append((ten, dat, thoi_gian))
        if not dat:
            co_loi = True

    in_tieu_de("BẢNG TỔNG HỢP KẾT QUẢ KIỂM TRA HỆ THỐNG")
    print(f"{'Hạng mục kiểm tra':<58} | {'Kết quả':<10} | {'Thời gian':<8}")
    print("-" * 80)
    for ten, dat, thoi_gian in tong_hop:
        trang_thai = "✅ ĐẠT" if dat else "❌ LỖI"
        print(f"{ten:<58} | {trang_thai:<10} | {thoi_gian:>6.2f}s")
    print("=" * 80)

    if co_loi:
        print("\n❌ CÓ HẠNG MỤC CHƯA ĐẠT. Vui lòng khắc phục trước khi commit và push lên remote!\n")
        sys.exit(1)
    else:
        print("\n🎉 TOÀN BỘ 5/5 HẠNG MỤC ĐỀU ĐẠT CHUẨN! Hệ thống an toàn tuyệt đối, sẵn sàng commit & push.\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
