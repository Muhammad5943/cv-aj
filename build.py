#!/usr/bin/env python3
"""
Build Script untuk Portfolio
Menggabungkan semua component HTML menjadi satu file index.html

Cara pakai:
1. Buka terminal di folder project
2. Jalankan: python build.py
3. File dist/index.html akan terbuat (siap deploy)
"""

import os
import re

def read_file(filepath):
    """Baca file dan return content"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return f"<!-- Error loading {filepath} -->"

def build_index():
    """Build index.html dari template dan components"""
    
    # Baca index-template.html
    template = read_file('index-template.html')
    
    # Pattern untuk cari data-include
    pattern = r'<div[^>]*data-include="([^"]+)"[^>]*></div>'
    
    def replace_include(match):
        filepath = match.group(1)
        # Remove ./ prefix & normalize path
        filepath = filepath.lstrip('./')
        print(f"  Loading: {filepath}")
        return read_file(filepath)
    
    # Replace semua data-include dengan content file
    result = re.sub(pattern, replace_include, template)
    
    return result

def main():
    print("=" * 50)
    print("Building Portfolio...")
    print("=" * 50)
    
    # Build HTML
    html_content = build_index()
    
    # Buat folder dist kalau belum ada
    os.makedirs('dist', exist_ok=True)
    
    # Copy CSS folder ke dist
    print("\nCopying CSS...")
    if os.path.exists('css'):
        import shutil
        if os.path.exists('dist/css'):
            shutil.rmtree('dist/css')
        shutil.copytree('css', 'dist/css')
    
    # Copy JS folder ke dist
    print("Copying JS...")
    if os.path.exists('js'):
        import shutil
        if os.path.exists('dist/js'):
            shutil.rmtree('dist/js')
        shutil.copytree('js', 'dist/js')
    
    # Copy images
    print("Copying images...")
    for img in ['cv-preview.png']:
        if os.path.exists(img):
            shutil.copy(img, f'dist/{img}')
    
    # Write hasil build
    output_path = 'dist/index.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("\n" + "=" * 50)
    print(f"✅ Build complete!")
    print(f"📁 Output: {output_path}")
    print(f"📊 Size: {len(html_content):,} bytes")
    print("=" * 50)
    print("\nUntuk deploy:")
    print("- Upload folder 'dist/' ke hosting")
    print("- Atau buka dist/index.html di browser")

if __name__ == '__main__':
    main()
