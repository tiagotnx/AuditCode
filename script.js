/*
 * JavaScript para o Gerador de Mensagem de Auditoria
 * Codificação: UTF-8
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- CONSTANTES ---
    const generalGuidelinesDefaultData = [
        { short: "Nomenclatura de variáveis por tipo (c, l, n, d...)", full: "Para os nomes das variáveis, a primeira letra deve ser minúscula e serve para identificar o seu tipo, exemplo: c = caracter, l = lógico, n = numérico, d = data, a = array, h = hash, o = objeto" },
        { short: "Nomes pequenos e sem abreviação", full: "Os nomes de classes, funções, variáveis, 'defines', comandos, arquivos-fonte e projetos devem ser pequenos, sem abreviação e condizentes com seu funcionamento/uso. Siglas conhecidas (ISSQN, ICMS, ...) não são abreviações." },
        { short: "Escopo de variável o menos abrangente possível", full: "Declarar as variáveis com um escopo (LOCAL ou STATIC) menos abrangente possível." },
        { short: "Variáveis STATIC com prefixo 's_', não usar PUBLIC/PRIVATE", full: 'As variáveis com o escopo STATIC devem possuir o prefixo "s_" e, sob hipótese alguma, usar variáveis PUBLIC, PRIVATE ou GLOBAL. Além disso, variáveis STATIC devem ser usadas quando as mesmas se fazem necessárias, e não para que não seja passado parâmetro.' },
        { short: "Criar funções para validações múltiplas no 'valid'", full: 'No "valid", quando houver mais de 2 validações, criar funções para chamar as validações.' },
        { short: "Usar PROCEDURE para sem retorno, FUNCTION com retorno", full: "Utilizar PROCEDURE se a função não for retornar nenhum valor, caso contrário, utilizar FUNCTION." },
        { short: "Espaçamento em parâmetros de funções", full: "Colocar um espaço antes de cada parâmetro de uma função e um espaço após o último parâmetro. Se a função não possuir parâmetros, não deve ser colocado espaços. Exemplos: NomeDaFuncao(), NomeDaFuncao( cParametro ), NomeDaFuncao( cParametro, nParametro )." },
        { short: "Quebra de linha e documentação para >5 parâmetros", full: "Separar os parâmetros da função/procedimento, por quebra de linha e documentando os campos (quando mais que 5 parâmetros). Posicionar a vírgula e o ponto e vírgula à direita e a documentação à esquerda. Os parâmetros deverão estar sempre alinhados à esquerda, ou seja, devem iniciar logo após a documentação." },
        { short: "Esboços de relatórios após função de cabeçalho", full: "Realizar esboços de relatórios depois da função do cabeçalho;" },
        { short: "Função principal deve ser 'Main'", full: "O nome da função principal dos programas deve ser Main;" },
        { short: "Identação em 'Do case' subsequentes", full: "No Do case, case subsequentes devem ser identados;" },
        { short: "Identação de 3 espaços (IF, FOR, WHILE, CASE)", full: "A identação de IF, FOR, WHILE, CASE deve conter 3 espaços;" },
        { short: "Identação de 6 espaços (IFDEF)", full: "A identação de IFDEF deve conter 6 espaços;" },
        { short: "Não usar COMMIT em laços de repetição", full: "Não utilizar o comando COMMIT em laços de repetição;" },
        { short: "Evitar uso de DBEVAL", full: "Evitar o uso do DBEVAL;" },
        { short: "Seguir padrão de nome de campos do arquivo (cadcli->codcli10)", full: "Seguir o padrão do nome dos campos do arquivo (Ex. cadcli->codcli10);" },
        { short: "Statements (if, endif) em minúsculas", full: "Statements (if, endif, while) deverão ser escritos em lowercase, exceto em PRGs específicos para classes." },
        { short: "Defines em maiúsculas (UpperCase)", full: "Os Defines deverão ser escritos em UpperCase;" },
        { short: "Nível de warning do compilador (Harbour /w3)", full: "Quando o CTRL+F9 estiver configurado para o xHarbour, utilizar o nível de warning 2 (/w2). Se estiver configurado para o Harbour, utilizar o nível de warning 3 (/w3). Sempre dar preferência para o compilador Harbour;" },
        { short: "Não criar esboços de telas", full: "Não criar esboços de telas;" },
        { short: "Usar variáveis de cores da lib0010.prg", full: "Quando for necessário utilizar cores, deverá ser utilizado as variáveis definidas na função lib0010.prg;" },
        { short: 'Usar "arquivo->(!eof())"', full: 'Utilizar "arquivo->(!eof())", ao invés de "!arquivo->(eof())";' },
        { short: "Utilizar constantes para posições de arrays", full: "Utilizar constantes nas posições dos arrays;" },
        { short: "Criar função para AADDs múltiplos no mesmo array", full: "Quando utilizar AADD mais de uma vez do mesmo array, criar função;" },
        { short: "Dividir função se parâmetro muda comportamento", full: "Quando for necessário passar uma parâmetro que muda o comportamento da função, quebrar a função em duas ou mais." },
        { short: "Nomes em UpperCamelCase (Funções, Classes, Fontes)", full: "Usar UpperCamelCase nos nomes das funções, procedimentos, classes, fontes e projetos. Com exceção das funções nativas do Harbour que iniciam com HB_" },
        { short: "Não chamar funções de executáveis dentro de libs", full: "Não chamar funções definidas em fontes de executáveis dentro de fontes pertencentes a libs." },
        { short: "Uma classe por arquivo fonte, com o mesmo nome", full: "Sempre deixar as classes em fontes separados e nomear os fontes com os nomes das classe, sendo uma classe por arquivo fonte." },
        { short: "Escrever nome de comandos/funções por extenso", full: "Escrever o nome de comandos/funções na forma inteira." },
        { short: "Nomear PRGs de acordo com a funcionalidade", full: 'Nome de novos PRG\'s, relacionar de acordo com a funcionalidade (Ex. "RelatorioProdutosPorFornecedor")' },
        { short: "Funções de procedimento devem ter um VERBO no nome", full: "Nas funções que realizam algum procedimento devem sempre ter um VERBO em seu nome;" },
        { short: "Recuo de três espaços nas funções", full: "Utilizar recuo de três espaços nas funções." },
        { short: "Não identar modificadores de acesso de classes", full: "Não identar os modificadores de acesso das classes com os membros de classe, ou seja, na definição da classe os membros de classe são identados, mas os modificadores de acesso não." },
        { short: "Separar tela, console e negócio em PRGs próprios", full: "Sempre que possível separar a tela em outro PRG próprio, nomenclatura: Fivewin: NomedoPrgFwh.prg, Console: NomedoPrgHrb.prg, Camada de negócio: NomedoPrg.prg;" },
        { short: 'Modelo de relatório: "Tela -> Processamento -> Impressão"', full: 'Para confecção de relatórios, seguir o modelo: "Tela -> Processamento -> Impressão."' },
        { short: "Nomes de tabelas DBF com no máximo 8 caracteres", full: "Criar tabelas DBF com nome de no máximo 8 caracteres." },
        { short: 'Limite de 64 bytes para "classe:Metodo()"', full: 'Não ultrapassar 64 bytes ao definir o nome de uma "classe:Metodo()".' },
        { short: "Parametrizar linha/coluna em funções de exibição", full: "Quando criar função para mostrar informações na tela, sempre parametrizar a linha/coluna." },
        { short: "Nomes de métodos em lowerCamelCase", full: "Os nomes dos métodos devem ser em lowerCamelCase." },
        { short: "Bons nomes (por que existe, o que faz, como é usado)", full: "Dica para criar bons nomes para as funções/variáveis...: 1º- Ele deve dizer por que ele existe, 2º- O que ele faz, 3º- Como ele é usado." },
        { short: "Usar GET/SET para atributos de classes quando necessário", full: "Utilizar os métodos de acesso GET/SET para atributos de classes quando necessário." },
        { short: "Limitar descrição de parâmetros (tabela Parame) a 20 caracteres", full: 'Na criação de novos parâmetros utilizando a tabela "Parame", limitar a descrição do campo em 20 caracteres.' },
        { short: "Converter para string em relatórios compartilhados (não fastreport)", full: "Em relatórios que não utilizam fastreport e que são compartilhados entre os sistemas em fivewin e sgvx, deve-se obrigatoriamente converter para string." },
        { short: "Não usar INIT para objeto", full: "Não utilizar INIT para objeto." },
        { short: "Não usar INIT para Array/hash com aninhamento", full: "Não utilizar INIT para Array ou hash quando eles tiverem array ou hash dentro." },
        { short: "Atualizar diagrama ao alterar classes", full: "Toda inclusão/alteração em classes, atualizar o diagrama." },
        { short: "NUNCA concatenar #defines", full: "NUNCA concatenar #defines." },
        { short: "Usar #defines apenas como constantes numéricas", full: "Usar #defines apenas como constante (array e hash não são constantes), não criar #defines com valores que não são números para fins de comparações." },
        { short: "Se usar #define para índice de array, criar para TODOS", full: "Se criar um #define para utilizar em algum índice de um array, criar para TODOS os índices e mudar em TODOS os lugares." },
        { short: "Atualizar arquivos .INI no repositório ao criar campo", full: "Sempre ao criar um campo em algum dos arquivos .INI, atualizá-los no repositório." },
        { short: "Não duplicar funções existentes", full: "Não criar funções que já existam com o mesmo propósito (Não duplicar)." },
        { short: "Declaração de variáveis com IFDEF antes das compartilhadas", full: "Na declaração de várias com IFDEF, colocá-las antes das variáveis compartilhadas." },
        { short: 'Usar a classe "Formatador de dados" para relatórios', full: 'Sempre que possível, utilizar a nova classe "Formatador de dados" para confecção de relatórios.' },
        { short: "Utilizar modelo de cabeçalho padrão para arquivos", full: "Utilizar o modelo de cabeçalho a seguir para os arquivos código-fonte:\n/*\n* Programador(a): \n* Criado em.....: \n* Funcao........: \n*\n* +------------------------------------------------------------------+\n* | Dados da ultima alteracao |\n* +------------------------------------------------------------------+\n* | $Date:: $ |\n* | $Revision:: $ |\n* | $Author:: $ |\n* +------------------------------------------------------------------+\n*/" },
        { short: "Extensão de novo arquivo em minúsculo e com propriedades", full: "Ao adicionar um novo arquivo, criá-lo com a extensão em minúsculo e adicionar as suas respectivas propriedades ( Author, Date, Revision )" },
        { short: "Não duplicar funções, movê-las para uma LIB se necessário", full: "Não duplicar funções já existentes, se necessário, movê-la para uma LIB." },
        { short: "Passar valor default em cada chamada ao adicionar novo parâmetro", full: "Na criação de novos parâmetros de função deverá ser passado o valor default em cada chamada." },
    ];

    const fivewinGuidelinesDefaultData = [
        { short: "Padrão de cores e zebrado para Browse", full: "Definição do Browse: Cor fundo: Branco, Barra de Seleção: Azul claro com foco e azul mais claro para sem foco, efeito zebrado: cinza e branco" },
        { short: "Utilizar FastReport para relatórios", full: "Na confecção de relatórios, utilizar o FastReport." },
        { short: "Usar Hash para armazenar componentes de tela", full: "Utilizar Hash para armazenar os objetos dos componentes de uma tela, sendo divididas em: hLabel, hInput, hButton, oBrowse." },
        { short: "Usar métodos acessores para componentes de tela", full: "Utilizar os metodos acessores dos componentes da tela, para atribuir ou pegar o valor de um componente." },
        { short: "Identar objetos que pertencem a dialog (3 espaços)", full: "Objetos que pertencem a dialog devem estar identadas (3 espaços)." }
    ];

    const defaultTemplate = {
        name: 'Padrão',
        content: `{saudacao},

De acordo com as diretrizes de desenvolvimento (http://projetos.sgsistemas.com.br/sgsistemas/wiki/departamentos/departamentos/desenvolvimento/processos/diretrizes-desenvolvimento-deep-fivewin-harbour), solicito que sejam realizadas as seguintes correções:

Ordem de Serviço: {os}
Revisão: {revisao}

{apontamentos}

O prazo para a correção é de dois dias úteis.

Atenciosamente,
{auditor}.`
    };

    const state = {
        revision: '',
        os: '',
        author: '',
        files: [],
        problems: [],
        auditorName: '',
        templates: [],
        activeTemplateName: 'Padrão',
        isQuickMode: false,
        generalGuidelines: [],
        fivewinGuidelines: []
    };

    let db;
    let guidelinesChartInstance;
    let authorsChartInstance;

    // --- DOM Elements ---
    const commitInfoTextarea = document.getElementById('commit-info');
    const fileSelect = document.getElementById('file-select');
    const guidelineSelectGeneral = document.getElementById('guideline-select-general');
    const guidelineSelectFivewin = document.getElementById('guideline-select-fivewin');
    const guidelineSearchGeneral = document.getElementById('guideline-search-general');
    const guidelineSearchFivewin = document.getElementById('guideline-search-fivewin');
    const linesInput = document.getElementById('lines');
    const addProblemBtn = document.getElementById('add-problem-btn');
    const problemsListDiv = document.getElementById('problems-list');
    const outputMessageTextarea = document.getElementById('output-message');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const auditorNameInput = document.getElementById('auditor-name');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const settingsFeedback = document.getElementById('settings-feedback');
    const tabGeneratorBtn = document.getElementById('tab-generator-btn');
    const tabSettingsBtn = document.getElementById('tab-settings-btn');
    const tabDashboardBtn = document.getElementById('tab-dashboard-btn');
    const tabMaintenanceBtn = document.getElementById('tab-maintenance-btn');
    const tabAuditsBtn = document.getElementById('tab-audits-btn');
    const tabGeneratorContent = document.getElementById('tab-generator-content');
    const tabSettingsContent = document.getElementById('tab-settings-content');
    const tabDashboardContent = document.getElementById('tab-dashboard-content');
    const tabMaintenanceContent = document.getElementById('tab-maintenance-content');
    const tabAuditsContent = document.getElementById('tab-audits-content');
    const templateNameInput = document.getElementById('template-name');
    const templateContentTextarea = document.getElementById('template-content');
    const saveTemplateBtn = document.getElementById('save-template-btn');
    const savedTemplatesList = document.getElementById('saved-templates-list');
    const templateSelector = document.getElementById('template-selector');
    const quickModeToggle = document.getElementById('quick-mode-toggle');
    // Maintenance DOM Elements
    const maintenanceGeneralList = document.getElementById('maintenance-general-list');
    const maintenanceFivewinList = document.getElementById('maintenance-fivewin-list');
    const formTitleGeneral = document.getElementById('form-title-general');
    const editingIndexGeneral = document.getElementById('editing-index-general');
    const shortDescGeneral = document.getElementById('short-desc-general');
    const fullDescGeneral = document.getElementById('full-desc-general');
    const saveGuidelineGeneralBtn = document.getElementById('save-guideline-general');
    const cancelEditGeneralBtn = document.getElementById('cancel-edit-general');
    const formTitleFivewin = document.getElementById('form-title-fivewin');
    const editingIndexFivewin = document.getElementById('editing-index-fivewin');
    const shortDescFivewin = document.getElementById('short-desc-fivewin');
    const fullDescFivewin = document.getElementById('full-desc-fivewin');
    const saveGuidelineFivewinBtn = document.getElementById('save-guideline-fivewin');
    const cancelEditFivewinBtn = document.getElementById('cancel-edit-fivewin');
    // Audits Maintenance
    const auditsMaintenanceList = document.getElementById('audits-maintenance-list');


    // --- IndexedDB Functions ---
    const initDB = () => {
        const request = indexedDB.open('AuditDB', 1);
        request.onerror = (event) => console.error("Database error: ", event.target.errorCode);
        request.onsuccess = (event) => { db = event.target.result; };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("audits", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("author", "author", { unique: false });
            objectStore.createIndex("guideline", "guideline", { unique: false });
            objectStore.createIndex("timestamp", "timestamp", { unique: false });
        };
    };

    const addAuditRecords = (records) => {
        if (!db) return;
        const transaction = db.transaction(["audits"], "readwrite");
        const objectStore = transaction.objectStore("audits");
        records.forEach(record => objectStore.add(record));
    };

    const getAudits = (callback) => {
        if (!db) return;
        const transaction = db.transaction(["audits"], "readonly");
        const objectStore = transaction.objectStore("audits");
        const request = objectStore.getAll();
        request.onsuccess = () => callback(request.result);
    };

    const deleteAudit = (id, callback) => {
        if (!db) return;
        const transaction = db.transaction(["audits"], "readwrite");
        const objectStore = transaction.objectStore("audits");
        const request = objectStore.delete(id);
        request.onsuccess = () => callback();
    };

    // --- Dashboard Functions ---
    const renderDashboard = () => {
        const allGuidelines = [...state.generalGuidelines, ...state.fivewinGuidelines].map(g => ({ ...g, fullWithNumber: `${g.originalIndex + 1}. ${g.full}` }));
        getAudits(allRecords => {
            const thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30);
            const recentRecords = allRecords.filter(r => r.timestamp >= thirtyDaysAgo);

            const guidelineCounts = recentRecords.reduce((acc, record) => {
                acc[record.guideline] = (acc[record.guideline] || 0) + 1;
                return acc;
            }, {});

            const sortedGuidelines = Object.entries(guidelineCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([fullGuideline, count]) => {
                    const guidelineObj = allGuidelines.find(g => g.fullWithNumber === fullGuideline);
                    const shortLabel = guidelineObj ? `${guidelineObj.originalIndex + 1}. ${guidelineObj.short}` : fullGuideline;
                    return [shortLabel, count];
                });

            const authorCounts = recentRecords.reduce((acc, record) => {
                acc[record.author] = (acc[record.author] || 0) + 1;
                return acc;
            }, {});
            const sortedAuthors = Object.entries(authorCounts).sort((a, b) => b[1] - a[1]);

            renderChart('guidelines-chart', guidelinesChartInstance, 'Top 5 Diretrizes Violadas', sortedGuidelines, (instance) => { guidelinesChartInstance = instance; });
            renderChart('authors-chart', authorsChartInstance, 'Apontamentos por Desenvolvedor', sortedAuthors, (instance) => { authorsChartInstance = instance; });
        });
    };

    const renderChart = (canvasId, chartInstance, label, data, setInstance) => {
        if (chartInstance) chartInstance.destroy();
        const ctx = document.getElementById(canvasId).getContext('2d');
        const newInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item[0]),
                datasets: [{
                    label: '# de Apontamentos',
                    data: data.map(item => item[1]),
                    backgroundColor: '#3E5641',
                    borderColor: '#822659',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { ticks: { color: '#F0F0F0' }, grid: { color: '#444444' } },
                    y: { ticks: { color: '#F0F0F0' }, grid: { color: '#444444' } }
                },
                plugins: { legend: { display: false } }
            }
        });
        setInstance(newInstance);
    };

    // --- Audits Maintenance ---
    const renderAuditsMaintenance = () => {
        getAudits(allRecords => {
            auditsMaintenanceList.innerHTML = '';
            if (allRecords.length === 0) {
                auditsMaintenanceList.innerHTML = '<p class="text-gray-500">Nenhuma auditoria salva encontrada.</p>';
                return;
            }
            // Sort by most recent first
            allRecords.sort((a, b) => b.timestamp - a.timestamp);
            allRecords.forEach(record => {
                const item = document.createElement('div');
                item.className = 'audit-item bg-[#1F1F1F] p-3 rounded-md text-sm flex justify-between items-center';
                const date = new Date(record.timestamp).toLocaleString('pt-BR');
                item.innerHTML = `
                <div>
                    <p class="font-semibold">${record.author}</p>
                    <p class="text-gray-400 text-xs">${date}</p>
                    <p class="mt-1">${record.guideline}</p>
                </div>
                <div>
                    <button data-id="${record.id}" class="delete-audit-btn bg-[#822659] hover:bg-[#621d43] text-white font-bold py-1 px-2 rounded text-xs">Excluir</button>
                </div>
            `;
                auditsMaintenanceList.appendChild(item);
            });
        });
    };

    // --- Core Functions ---
    const capitalize = (s) => s.replace(/\b\w/g, l => l.toUpperCase()).replace('.', ' ');

    const populateSelect = (selectElement, items) => {
        selectElement.innerHTML = '';
        items.forEach(item => {
            const option = document.createElement('option');
            const text = `${item.originalIndex + 1}. ${item.short}`;
            option.value = `${item.originalIndex + 1}. ${item.full}`;
            option.textContent = text;
            selectElement.appendChild(option);
        });
    };

    const filterGuidelines = (searchTerm, selectElement, sourceArray) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = sourceArray.filter(g =>
            g.short.toLowerCase().includes(lowerCaseSearchTerm) ||
            g.full.toLowerCase().includes(lowerCaseSearchTerm)
        );
        populateSelect(selectElement, filtered);
    };

    const parseCommitInfo = (text) => {
        state.revision = (text.match(/Revision:\s*(\d+)/) || [])[1] || '';
        state.os = (text.match(/SVN#(\d+)/) || [])[1] || '';
        state.author = (text.match(/Author:\s*([^\s\n\r]+)/) || [])[1] || '';

        // Tenta diferentes padrões para arquivos modificados/adicionados
        let files = [];

        // Padrão 1: "Modified : arquivo.ext" ou "Added : arquivo.ext"
        let modifiedFiles = text.match(/(Modified|Added)\s*:\s*(.+)/g);
        if (modifiedFiles) {
            files = files.concat(modifiedFiles.map(line => {
                // Remove "Modified :" ou "Added :" e extrai o caminho do arquivo
                let filePath = line.replace(/(Modified|Added)\s*:\s*/, '').trim();
                // Extrai apenas o nome do arquivo do caminho completo
                return filePath.split('/').pop() || filePath;
            }));
        }

        // Padrão 2: Arquivos listados após "Modified:" ou "Added:"
        let modifiedSection = text.match(/(Modified|Added)\s*:\s*\n?((?:\s+.+\n?)*)/);
        if (modifiedSection && modifiedSection[2]) {
            let fileLines = modifiedSection[2].split('\n').filter(line => line.trim());
            files = files.concat(fileLines.map(line => {
                let cleanLine = line.trim();
                // Extrai apenas o nome do arquivo do caminho completo
                return cleanLine.split('/').pop() || cleanLine;
            }));
        }

        // Padrão 3: Lista após marcadores como "----" (formato SVN detalhado)
        if (files.length === 0) {
            let allLines = text.split('\n');
            let startIndex = -1;

            // Procura por linhas que começam com "Added :", "Modified :", etc.
            for (let i = 0; i < allLines.length; i++) {
                if (allLines[i].match(/^(Added|Modified|Deleted)\s*:/)) {
                    let filePath = allLines[i].replace(/^(Added|Modified|Deleted)\s*:\s*/, '').trim();
                    if (filePath) {
                        // Extrai apenas o nome do arquivo do caminho completo
                        let fileName = filePath.split('/').pop();
                        if (fileName && (fileName.includes('.') || fileName.length > 0)) {
                            files.push(fileName);
                        }
                    }
                }
            }
        }

        // Padrão 4: Lista simples de arquivos (fallback)
        if (files.length === 0) {
            let allLines = text.split('\n');
            let startIndex = -1;
            for (let i = 0; i < allLines.length; i++) {
                if (allLines[i].includes('Modified') || allLines[i].includes('Added')) {
                    startIndex = i + 1;
                    break;
                }
            }
            if (startIndex > -1) {
                for (let i = startIndex; i < allLines.length; i++) {
                    let line = allLines[i].trim();
                    if (line && !line.includes(':') && (line.includes('.') || line.includes('/'))) {
                        // Extrai apenas o nome do arquivo do caminho completo
                        let fileName = line.split('/').pop() || line;
                        files.push(fileName);
                    } else if (line === '' || line.includes('Author:') || line.includes('Date:')) {
                        break;
                    }
                }
            }
        }

        // Remove duplicatas e arquivos vazios
        state.files = [...new Set(files.filter(file => file && file.trim().length > 0))];

        if (state.author && !state.auditorName) {
            const formattedAuthor = capitalize(state.author);
            auditorNameInput.value = formattedAuthor;
            state.auditorName = formattedAuthor;
            localStorage.setItem('auditorName', formattedAuthor);
        }
        updateUI();
        if (state.isQuickMode) {
            guidelineSearchGeneral.focus();
        }
    };

    const updateUI = () => {
        fileSelect.innerHTML = state.files.length > 0
            ? state.files.map(file => `<option value="${file}">${file}</option>`).join('')
            : '<option>Aguardando dados do commit...</option>';
        renderProblems();
        generateMessage();
    };

    const renderProblems = () => {
        problemsListDiv.innerHTML = '';
        if (state.problems.length === 0) {
            problemsListDiv.innerHTML = '<p class="text-gray-500 text-sm">Nenhum problema adicionado ainda.</p>';
            return;
        }

        // Agrupa problemas por arquivo para melhor visualização
        const fileGroups = {};
        state.problems.forEach((problem, index) => {
            if (!fileGroups[problem.file]) {
                fileGroups[problem.file] = [];
            }
            fileGroups[problem.file].push({ ...problem, originalIndex: index });
        });

        state.problems.forEach((problem, index) => {
            const problemDiv = document.createElement('div');
            const fileCount = fileGroups[problem.file].length;
            const isMultipleInFile = fileCount > 1;

            problemDiv.className = 'problem-item entering flex justify-between items-center bg-[#1F1F1F] p-2 rounded-md text-sm';

            const lineInfo = problem.lines ? `[${problem.lines}] ` : '';
            const fileIcon = isMultipleInFile ? '📁' : '📄';
            const fileIndicator = isMultipleInFile ? ` (${fileCount} apontamentos)` : '';

            problemDiv.innerHTML = `
            <div class="flex flex-col flex-grow pr-2">
                <div class="text-xs text-gray-400 mb-1">
                    ${fileIcon} ${problem.file}${fileIndicator}
                </div>
                <span class="truncate" title="Linha(s): ${problem.lines || 'N/A'}\nArquivo: ${problem.file}\nDiretriz: ${problem.guideline}">
                    ${lineInfo}${problem.guideline.substring(0, 60)}...
                </span>
            </div>
            <button data-index="${index}" class="remove-problem-btn bg-[#822659] hover:bg-[#621d43] text-[#F0F0F0] font-bold py-1 px-2 rounded text-xs flex-shrink-0">Remover</button>
        `;
            problemsListDiv.appendChild(problemDiv);
            setTimeout(() => problemDiv.classList.remove('entering'), 10);
        });
    };

    const addProblem = () => {
        if (!validateLinesInput()) return;
        const file = fileSelect.value;
        const guideline = guidelineSelectGeneral.value || guidelineSelectFivewin.value;
        const lines = linesInput.value.trim();

        if (!file || !guideline || file === 'Aguardando dados do commit...') {
            alert('Por favor, preencha o campo Arquivo e selecione uma das diretrizes.');
            return;
        }

        // Verificação de duplicatas exatas: mesmo arquivo + mesma diretriz + mesma linha (ou ambas sem linha)
        const isDuplicateExact = state.problems.some(problem =>
            problem.file === file &&
            problem.guideline === guideline &&
            problem.lines === lines
        );

        if (isDuplicateExact) {
            const lineText = lines ? ` na linha ${lines}` : ' (sem linha especificada)';
            alert(`⚠️ Este apontamento já existe!\n\nArquivo: ${file}${lineText}\nDiretriz: ${guideline.substring(0, 80)}...\n\nSe você quer adicionar a mesma diretriz em uma linha diferente, especifique a linha. Caso contrário, selecione uma diretriz diferente.`);
            return;
        }

        // Verificação de aviso: mesmo arquivo + mesma diretriz mas linha diferente
        const hasSameGuidelineInFile = state.problems.some(problem =>
            problem.file === file &&
            problem.guideline === guideline &&
            problem.lines !== lines
        );

        if (hasSameGuidelineInFile) {
            const confirmAdd = confirm(`⚠️ Atenção!\n\nEsta diretriz já foi aplicada ao arquivo "${file}" em uma linha diferente.\n\nTem certeza que deseja adicionar novamente?`);
            if (!confirmAdd) {
                return;
            }
        }

        state.problems.push({ file, guideline, lines });
        linesInput.value = '';
        guidelineSelectGeneral.value = '';
        guidelineSelectFivewin.value = '';
        guidelineSearchGeneral.value = '';
        guidelineSearchFivewin.value = '';
        filterGuidelines('', guidelineSelectGeneral, state.generalGuidelines);
        filterGuidelines('', guidelineSelectFivewin, state.fivewinGuidelines);

        if (state.isQuickMode) {
            guidelineSearchGeneral.focus();
        } else {
            linesInput.focus();
        }
        updateUI();
    };

    const removeProblem = (index) => {
        state.problems.splice(index, 1);
        updateUI();
    };

    const groupProblems = () => {
        const grouped = state.problems.reduce((acc, problem) => {
            (acc[problem.file] = acc[problem.file] || []).push(problem);
            return acc;
        }, {});
        return Object.entries(grouped).map(([file, problems]) => {
            const problemTexts = problems.map(p => {
                let text = '';
                if (p.lines) text += `Linha: ${p.lines}\n`;
                text += p.guideline;
                return text;
            }).join('\n\n');
            return `Arquivo: ${file}\n${problemTexts}`;
        }).join('\n\n');
    };

    const generateMessage = () => {
        const activeTemplate = state.templates.find(t => t.name === state.activeTemplateName) || defaultTemplate;

        if (!state.os || !state.revision || !state.auditorName || state.problems.length === 0) {
            let missingItems = [];
            if (!state.os) missingItems.push('Número da OS (SVN#)');
            if (!state.revision) missingItems.push('Número da Revisão');
            if (!state.auditorName) missingItems.push('Nome do auditor (configure nas Configurações)');
            if (state.problems.length === 0) missingItems.push('Apontamentos de problemas');

            outputMessageTextarea.value = `Para gerar a mensagem de auditoria, você precisa:\n\n${missingItems.map(item => `• ${item}`).join('\n')}\n\nPasso a passo:\n1. Cole os dados do commit na área de texto acima\n2. Configure seu nome na aba "Configurações"\n3. Adicione apontamentos selecionando arquivo e diretriz\n4. A mensagem será gerada automaticamente`;
            return;
        }

        const replacements = {
            '{saudacao}': 'Boa tarde',
            '{os}': state.os,
            '{revisao}': state.revision,
            '{apontamentos}': groupProblems(),
            '{auditor}': state.auditorName
        };

        let message = activeTemplate.content;
        for (const key in replacements) {
            message = message.replace(new RegExp(key, 'g'), replacements[key]);
        }
        outputMessageTextarea.value = message;
    };

    const copyToClipboard = () => {
        if (!outputMessageTextarea.value) return;

        const recordsToSave = state.problems.map(p => ({
            author: state.author,
            guideline: p.guideline,
            timestamp: new Date().getTime()
        }));
        addAuditRecords(recordsToSave);

        outputMessageTextarea.select();
        outputMessageTextarea.setSelectionRange(0, 99999);
        try {
            if (document.execCommand('copy')) {
                copyBtn.textContent = 'Copiado!';
                copyBtn.classList.remove('bg-[#444444]');
                copyBtn.classList.add('bg-[#3E5641]');
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar';
                    copyBtn.classList.remove('bg-[#3E5641]');
                    copyBtn.classList.add('bg-[#444444]');
                }, 2000);
            }
        } catch (err) { console.error('Falha ao copiar texto: ', err); }
        window.getSelection().removeAllRanges();
    };

    const saveSettings = () => {
        const name = auditorNameInput.value.trim();
        if (name) {
            localStorage.setItem('auditorName', name);
            state.auditorName = name;
        }
        state.isQuickMode = quickModeToggle.checked;
        localStorage.setItem('isQuickMode', state.isQuickMode);

        settingsFeedback.textContent = 'Configurações salvas!';
        setTimeout(() => settingsFeedback.textContent = '', 3000);
        generateMessage();
    };

    const loadSettings = () => {
        const savedName = localStorage.getItem('auditorName');
        if (savedName) {
            state.auditorName = savedName;
            auditorNameInput.value = savedName;
        }
        const savedQuickMode = localStorage.getItem('isQuickMode') === 'true';
        state.isQuickMode = savedQuickMode;
        quickModeToggle.checked = savedQuickMode;
    };

    const validateLinesInput = () => {
        const regex = /^(\d+(-\d+)?)?$/;
        const isValid = regex.test(linesInput.value);
        linesInput.classList.toggle('invalid-input', !isValid);
        linesInput.setAttribute('aria-invalid', !isValid);
        if (!isValid) alert('Formato de linha inválido. Use números (ex: 100) ou intervalos (ex: 100-105).');
        return isValid;
    };

    const loadTemplates = () => {
        const saved = localStorage.getItem('auditTemplates');
        state.templates = saved ? JSON.parse(saved) : [defaultTemplate];
        const active = localStorage.getItem('activeAuditTemplate') || 'Padrão';
        state.activeTemplateName = state.templates.some(t => t.name === active) ? active : 'Padrão';
    };

    const saveTemplates = () => {
        localStorage.setItem('auditTemplates', JSON.stringify(state.templates));
        localStorage.setItem('activeAuditTemplate', state.activeTemplateName);
    };

    const renderTemplates = () => {
        savedTemplatesList.innerHTML = '';
        templateSelector.innerHTML = '';
        state.templates.forEach(template => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center bg-[#1F1F1F] p-2 rounded-md text-sm';
            div.innerHTML = `
            <span>${template.name}</span>
            <div>
                <button data-name="${template.name}" class="edit-template-btn text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                <button data-name="${template.name}" class="delete-template-btn text-red-400 hover:text-red-300">Remover</button>
            </div>
        `;
            savedTemplatesList.appendChild(div);
            const option = document.createElement('option');
            option.value = template.name;
            option.textContent = template.name;
            option.selected = template.name === state.activeTemplateName;
            templateSelector.appendChild(option);
        });
    };

    // --- Guideline Maintenance ---
    const loadGuidelines = () => {
        const savedGeneral = localStorage.getItem('generalGuidelines');
        const savedFivewin = localStorage.getItem('fivewinGuidelines');
        state.generalGuidelines = savedGeneral ? JSON.parse(savedGeneral) : generalGuidelinesDefaultData.map((item, index) => ({ ...item, originalIndex: index }));
        state.fivewinGuidelines = savedFivewin ? JSON.parse(savedFivewin) : fivewinGuidelinesDefaultData.map((item, index) => ({ ...item, originalIndex: index }));
        if (!savedGeneral) saveGuidelines();
    };

    const saveGuidelines = () => {
        localStorage.setItem('generalGuidelines', JSON.stringify(state.generalGuidelines));
        localStorage.setItem('fivewinGuidelines', JSON.stringify(state.fivewinGuidelines));
    };

    const renderMaintenanceLists = () => {
        renderMaintenanceList('general', state.generalGuidelines, maintenanceGeneralList);
        renderMaintenanceList('fivewin', state.fivewinGuidelines, maintenanceFivewinList);
    };

    const renderMaintenanceList = (type, guidelines, listElement) => {
        listElement.innerHTML = '';
        guidelines.forEach((g, index) => {
            const item = document.createElement('div');
            item.className = 'guideline-item flex justify-between items-center bg-[#1F1F1F] p-2 rounded-md text-sm';
            item.innerHTML = `
            <span class="truncate pr-2">${g.originalIndex + 1}. ${g.short}</span>
            <div>
                <button data-type="${type}" data-index="${index}" class="edit-guideline-btn text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                <button data-type="${type}" data-index="${index}" class="delete-guideline-btn text-red-400 hover:text-red-300">Excluir</button>
            </div>
        `;
            listElement.appendChild(item);
        });
    };

    const handleSaveGuideline = (type) => {
        const shortDesc = document.getElementById(`short-desc-${type}`).value.trim();
        const fullDesc = document.getElementById(`full-desc-${type}`).value.trim();
        const editingIndex = document.getElementById(`editing-index-${type}`).value;

        if (!shortDesc || !fullDesc) {
            alert('Ambas as descrições são obrigatórias.');
            return;
        }

        if (editingIndex !== '') {
            // Editing
            state[`${type}Guidelines`][editingIndex].short = shortDesc;
            state[`${type}Guidelines`][editingIndex].full = fullDesc;
        } else {
            // Adding new
            const newIndex = state[`${type}Guidelines`].length;
            state[`${type}Guidelines`].push({ short: shortDesc, full: fullDesc, originalIndex: newIndex });
        }

        saveGuidelines();
        renderMaintenanceLists();
        populateSelect(guidelineSelectGeneral, state.generalGuidelines);
        populateSelect(guidelineSelectFivewin, state.fivewinGuidelines);
        resetGuidelineForm(type);
    };

    const resetGuidelineForm = (type) => {
        document.getElementById(`form-title-${type}`).textContent = `Adicionar Nova Diretriz ${type === 'general' ? 'Geral' : 'Fivewin'}`;
        document.getElementById(`editing-index-${type}`).value = '';
        document.getElementById(`short-desc-${type}`).value = '';
        document.getElementById(`full-desc-${type}`).value = '';
        document.getElementById(`save-guideline-${type}`).textContent = 'Adicionar';
        document.getElementById(`cancel-edit-${type}`).classList.add('hidden');
    };

    const resetForNewAudit = () => {
        state.revision = '';
        state.os = '';
        state.author = '';
        state.files = [];
        state.problems = [];
        commitInfoTextarea.value = '';
        linesInput.value = '';
        guidelineSearchGeneral.value = '';
        guidelineSearchFivewin.value = '';
        guidelineSelectGeneral.value = '';
        guidelineSelectFivewin.value = '';
        filterGuidelines('', guidelineSelectGeneral, state.generalGuidelines);
        filterGuidelines('', guidelineSelectFivewin, state.fivewinGuidelines);
        updateUI();
        commitInfoTextarea.focus();
    };

    // --- Event Listeners ---
    commitInfoTextarea.addEventListener('input', (e) => parseCommitInfo(e.target.value));
    addProblemBtn.addEventListener('click', addProblem);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', resetForNewAudit);
    saveSettingsBtn.addEventListener('click', saveSettings);
    linesInput.addEventListener('blur', validateLinesInput);

    guidelineSearchGeneral.addEventListener('input', (e) => filterGuidelines(e.target.value, guidelineSelectGeneral, state.generalGuidelines));
    guidelineSearchFivewin.addEventListener('input', (e) => filterGuidelines(e.target.value, guidelineSelectFivewin, state.fivewinGuidelines));

    [guidelineSelectGeneral, guidelineSelectFivewin].forEach(el => {
        el.addEventListener('change', (e) => {
            if (e.target.id === 'guideline-select-general') guidelineSelectFivewin.value = '';
            else guidelineSelectGeneral.value = '';
            if (state.isQuickMode) linesInput.focus();
        });
        if (state.isQuickMode) {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    linesInput.focus();
                }
            });
        }
    });

    problemsListDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-problem-btn')) {
            removeProblem(parseInt(e.target.dataset.index));
        }
    });

    saveTemplateBtn.addEventListener('click', () => {
        const name = templateNameInput.value.trim();
        const content = templateContentTextarea.value.trim();
        if (!name || !content) {
            alert('Nome e conteúdo do template são obrigatórios.');
            return;
        }
        const existingIndex = state.templates.findIndex(t => t.name === name);
        if (existingIndex > -1) {
            state.templates[existingIndex] = { name, content };
        } else {
            state.templates.push({ name, content });
        }
        state.activeTemplateName = name;
        saveTemplates();
        renderTemplates();
        templateNameInput.value = '';
        templateContentTextarea.value = '';
        generateMessage();
    });

    savedTemplatesList.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        if (e.target.classList.contains('delete-template-btn')) {
            if (name === 'Padrão') {
                alert('O template Padrão não pode ser removido.');
                return;
            }
            if (confirm(`Tem certeza que deseja remover o template "${name}"?`)) {
                state.templates = state.templates.filter(t => t.name !== name);
                if (state.activeTemplateName === name) {
                    state.activeTemplateName = 'Padrão';
                }
                saveTemplates();
                renderTemplates();
                generateMessage();
            }
        }
        if (e.target.classList.contains('edit-template-btn')) {
            const template = state.templates.find(t => t.name === name);
            if (template) {
                templateNameInput.value = template.name;
                templateContentTextarea.value = template.content;
            }
        }
    });

    templateSelector.addEventListener('change', (e) => {
        state.activeTemplateName = e.target.value;
        saveTemplates();
        generateMessage();
    });

    const switchTab = (tabName) => {
        ['generator', 'settings', 'dashboard', 'maintenance', 'audits'].forEach(name => {
            const tabContent = document.getElementById(`tab-${name}-content`);
            const tabBtn = document.getElementById(`tab-${name}-btn`);
            if (tabContent && tabBtn) {
                tabContent.classList.toggle('hidden', name !== tabName);
                tabBtn.classList.toggle('active', name === tabName);
                tabBtn.setAttribute('aria-selected', name === tabName);
            }
        });
        if (tabName === 'dashboard') renderDashboard();
        if (tabName === 'maintenance') renderMaintenanceLists();
        if (tabName === 'audits') renderAuditsMaintenance();
    };
    tabGeneratorBtn.addEventListener('click', () => switchTab('generator'));
    tabSettingsBtn.addEventListener('click', () => switchTab('settings'));
    tabDashboardBtn.addEventListener('click', () => switchTab('dashboard'));
    tabMaintenanceBtn.addEventListener('click', () => switchTab('maintenance'));
    tabAuditsBtn.addEventListener('click', () => switchTab('audits'));

    linesInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || state.isQuickMode) && e.key === 'Enter') {
            e.preventDefault();
            addProblemBtn.click();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            copyBtn.click();
        }
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (!tabSettingsContent.classList.contains('hidden')) {
                saveSettingsBtn.click();
                saveTemplateBtn.click();
            }
        }
    });

    // Maintenance Listeners
    saveGuidelineGeneralBtn.addEventListener('click', () => handleSaveGuideline('general'));
    saveGuidelineFivewinBtn.addEventListener('click', () => handleSaveGuideline('fivewin'));
    cancelEditGeneralBtn.addEventListener('click', () => resetGuidelineForm('general'));
    cancelEditFivewinBtn.addEventListener('click', () => resetGuidelineForm('fivewin'));

    [maintenanceGeneralList, maintenanceFivewinList].forEach(list => {
        list.addEventListener('click', (e) => {
            const target = e.target;
            const type = target.dataset.type;
            const index = parseInt(target.dataset.index);

            if (target.classList.contains('delete-guideline-btn')) {
                if (confirm('Tem certeza que deseja excluir esta diretriz?')) {
                    state[`${type}Guidelines`].splice(index, 1);
                    // Re-index after deletion
                    state[`${type}Guidelines`].forEach((g, i) => g.originalIndex = i);
                    saveGuidelines();
                    renderMaintenanceLists();
                    populateSelect(guidelineSelectGeneral, state.generalGuidelines);
                    populateSelect(guidelineSelectFivewin, state.fivewinGuidelines);
                }
            } else if (target.classList.contains('edit-guideline-btn')) {
                const guideline = state[`${type}Guidelines`][index];
                document.getElementById(`form-title-${type}`).textContent = `Editando Diretriz #${guideline.originalIndex + 1}`;
                document.getElementById(`editing-index-${type}`).value = index;
                document.getElementById(`short-desc-${type}`).value = guideline.short;
                document.getElementById(`full-desc-${type}`).value = guideline.full;
                document.getElementById(`save-guideline-${type}`).textContent = 'Salvar Alterações';
                document.getElementById(`cancel-edit-${type}`).classList.remove('hidden');
            }
        });
    });

    auditsMaintenanceList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-audit-btn')) {
            const auditId = parseInt(e.target.dataset.id);
            if (confirm('Tem certeza que deseja excluir este registro de auditoria?')) {
                deleteAudit(auditId, () => {
                    renderAuditsMaintenance(); // Refresh the list
                });
            }
        }
    });

    // --- INICIALIZAÇÃO ---
    initDB();
    loadGuidelines();
    loadSettings(); // Carrega configurações antes de popular selects
    loadTemplates();
    populateSelect(guidelineSelectGeneral, state.generalGuidelines);
    populateSelect(guidelineSelectFivewin, state.fivewinGuidelines);
    renderTemplates();
    updateUI();

    // Força uma primeira geração de mensagem para mostrar o estado inicial
    setTimeout(() => {
        generateMessage();
    }, 100);
});
