#!/usr/bin/env python3
import argparse
from pathlib import Path
from datetime import date
import re

def parse_args():
    ap = argparse.ArgumentParser(
        description="Create an empty Fairway Vision session scaffold."
    )
    ap.add_argument("--root", default="./project_root",
                    help="Project root (default: ./project_root)")
    ap.add_argument("--date", default=None,
                    help="Session date as YYYY-MM-DD (default: today)")
    ap.add_argument("--shots", type=int, default=1,
                    help="How many empty shot folders to create (default: 1)")
    ap.add_argument("--start", type=int, default=None,
                    help="Start shot number (e.g., 1 -> shot_0001). "
                         "If omitted, auto-continues from existing.")
    ap.add_argument("--touch-video", action="store_true",
                    help="Create an empty vid.mp4 placeholder in each shot")
    ap.add_argument("--frames", type=int, default=0,
                    help="Create N empty frame files (frame_00001.jpg ...) per shot")
    return ap.parse_args()

def ensure_session_dir(root: Path, session_date: str) -> Path:
    session_dir = root / "sessions" / session_date
    session_dir.mkdir(parents=True, exist_ok=True)
    return session_dir

def next_shot_number(session_dir: Path) -> int:
    """Find next available shot number based on existing shot_XXXX dirs."""
    last = 0
    for p in session_dir.iterdir():
        if p.is_dir():
            m = re.match(r"shot_(\d{4})$", p.name)
            if m:
                n = int(m.group(1))
                if n > last:
                    last = n
    return last + 1

def make_shot_dir(session_dir: Path, num: int) -> Path:
    shot_dir = session_dir / f"shot_{num:04d}"
    shot_dir.mkdir(parents=True, exist_ok=False)
    return shot_dir

def touch_placeholders(shot_dir: Path, touch_video: bool, frames: int):
    if touch_video:
        (shot_dir / "vid.mp4").touch()
    for i in range(1, frames + 1):
        (shot_dir / f"frame_{i:05d}.jpg").touch()

def main():
    args = parse_args()
    root = Path(args.root).resolve()
    session_date = args.date or date.today().isoformat()

    session_dir = ensure_session_dir(root, session_date)

    # Decide starting shot number
    if args.start is not None:
        start_num = int(args.start)
    else:
        start_num = next_shot_number(session_dir)

    created = []
    current = start_num
    for _ in range(args.shots):
        shot_dir = make_shot_dir(session_dir, current)
        touch_placeholders(shot_dir, args.touch_video, args.frames)
        created.append(shot_dir)
        current += 1

    print("\nCreated the following scaffold:")
    for p in created:
        print(f"  {p}")
        if args.touch_video:
            print(f"    - {p/'vid.mp4'}")
        if args.frames > 0:
            print(f"    - {args.frames} empty frames (frame_00001.jpg ..)")

    print("\nDone.")

if __name__ == "__main__":
    main()
