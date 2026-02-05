# docx2tex

Converts Microsoft Word's DOCX to LaTeX

https://github.com/transpect/docx2tex

## download the latest release
Download the latest [docx2tex release](https://github.com/transpect/docx2tex/releases)

…or get source via Git. Please note that you have to add the `--recursive` option in order to clone docx2hub with submodules.
```bash
git clone https://github.com/transpect/docx2tex --recursive
```

## requirements
* Java 1.7 up to 1.15 (more recent versions not yet tested). Java 11 has a bug with file URIs, it should be avoided. Java 13 is safe again.
* works on Windows, Linux and Mac OS X

## run docx2tex
You can run docx2tex with a Bash script (Linux, Mac OSX, Cygwin) or the Windows batch script whose options are somewhat limited, compared to the Bash script.

### Linux/MacOSX
```bash
./d2t [options ...] myfile.docx
```

Option  | Description
------  | -------------
 -o     | path to custom output directory
 -c     | path to custom docx2tex configuration file
 -m     | choose MathType source (ole\|wmf\|ole+wmf)
 -f     | path to custom fontmaps directory
 -p     | generate PDF with pdflatex
 -t     | choose table model (tabularx\|tabular\|htmltabs)
 -e     | custom XSLT stylesheet for evolve-hub overrides
 -x     | custom XSLT stylesheet for postprocessing the evolve-hub results
 -d     | debug mode

### via XML Calabash
```bash
calabash/calabash.sh -o result=myfile.tex -o hub=myfile.xml xpl/docx2tex.xpl docx=myfile.docx conf=conf/conf.xml
```