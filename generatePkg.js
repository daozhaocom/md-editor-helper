const fs = require('fs');
const packageTemplateJson = require('./src/pkg_template.json');
const snippetList = require('./src/snippetList.json');
// 生成package.json
function generatePkg() {
    console.log('generating package.json');
    const result = JSON.parse(JSON.stringify(packageTemplateJson));
	const commands = result.contributes.commands;
	const helperMenus = result.contributes.menus["Markdown Helper"];

	snippetList.forEach(item => {
		const type = item.type || [];
		if (type.includes('command')) {
			commands.push({
				command: "md-editor-helper.context." + item.prefix,
				title: item.title,
			})
		}
		if (type.includes('submenu')) {
			helperMenus.push({
				command: "md-editor-helper.context." + item.prefix,
        		alt: "md-editor-helper.context." + item.prefix,
        		group: "navigation"
			})
		}
	})

    fs.writeFileSync('./package.json', JSON.stringify(result, null, 2));
    console.log('generated package.json success');
}


generatePkg();