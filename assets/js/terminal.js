document.addEventListener('DOMContentLoaded', function() {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalForm = document.getElementById('terminal-form');
    
    if (!terminalBody || !terminalInput || !terminalForm) return;
    
    // Histórico de comandos
    let commandHistory = [];
    let historyIndex = -1;
    
    // Comandos disponíveis
    const commands = {
        'ajuda': {
            description: 'Mostra a lista de comandos disponíveis',
            action: function() {
                let response = 'Comandos disponíveis:\n';
                for (const cmd in commands) {
                    response += `  ${cmd} - ${commands[cmd].description}\n`;
                }
                return response;
            }
        },
        'sobre': {
            description: 'Exibe informações sobre mim',
            action: function() {
                return `Nome: Gabriel Bernardes\nProfissão: Desenvolvedor Front-end\nLocalização: Brasil\n\nSou um estudante novato apaixonado por experiências web interativas, intuitivas e principalmente apaixonado por tecnologia. Meu foco está em transformar ideias em interfaces digitais memoráveis, combinando boas práticas com design atraente.`;
            }
        },
        'habilidades': {
            description: 'Lista as habilidades técnicas',
            action: function() {
                return `Habilidades Técnicas:\n\n- HTML5 & CSS3\n- JavaScript\n- Responsive Design\n- UI/UX Design\n- Git & GitHub\n- Frameworks Front-end`;
            }
        },
        'projetos': {
            description: 'Mostra os projetos em destaque',
            action: function() {
                return `Projetos em Destaque:\n\n1. Amigo Secreto\n   Tecnologias: HTML, CSS, JavaScript\n   Link: https://challenge-amigo-secreto-amber-chi.vercel.app/\n\n2. Projeto Portfolio\n   Tecnologias: HTML, CSS\n   Link: https://portfolio-gabriel-chi.vercel.app/`;
            }
        },
        'contato': {
            description: 'Exibe informações de contato',
            action: function() {
                return `Email: gabriel.original2001@gmail.com\nGitHub: https://github.com/devbernardes\nLinkedIn: https://www.linkedin.com/in/gabriesbernardes/`;
            }
        },
        'limpar': {
            description: 'Limpa o terminal',
            action: function() {
                terminalBody.innerHTML = '';
                addResponse('Bem-vindo ao meu terminal interativo!', 'command-info');
                addResponse('Digite "ajuda" para ver a lista de comandos disponíveis.', 'command-info');
                return '';
            }
        },
        'data': {
            description: 'Mostra a data e hora atual',
            action: function() {
                const now = new Date();
                return `Data atual: ${now.toLocaleDateString('pt-BR')}\nHora atual: ${now.toLocaleTimeString('pt-BR')}`;
            }
        },
        'experiencia': {
            description: 'Mostra a experiência profissional',
            action: function() {
                return `Experiência Profissional:\n\n- 2 meses de experiência em desenvolvimento front-end\n- Projetos freelance para estudo e voluntariado\n- Foco em criar interfaces responsivas e acessíveis`;
            }
        }
    };
    
    // Adiciona mensagem inicial ao carregar a página
    addResponse('Bem-vindo ao meu terminal interativo!', 'command-info');
    addResponse('Digite "ajuda" para ver a lista de comandos disponíveis.', 'command-info');
    
    // Processa o comando quando o formulário é enviado
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const command = terminalInput.value.trim().toLowerCase();
        
        if (command) {
            // Adiciona o comando ao histórico
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Exibe o comando digitado
            addCommand(command);
            
            // Processa o comando
            processCommand(command);
            
            // Limpa o input
            terminalInput.value = '';
            
            // Rola para o final do terminal
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
    
    // Navegação no histórico de comandos com setas
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autoCompleteCommand();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });
    
    // Função para processar o comando
    function processCommand(command) {
        if (commands[command]) {
            const response = commands[command].action();
            if (response) {
                addResponse(response);
            }
        } else {
            addResponse(`Comando não reconhecido: ${command}. Digite "ajuda" para ver os comandos disponíveis.`, 'command-error');
        }
    }
    
    // Função para adicionar um comando ao terminal
    function addCommand(command) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'terminal-prompt';
        promptSpan.textContent = 'gabriel@portfolio:~$ ';
        
        const commandSpan = document.createElement('span');
        commandSpan.className = 'terminal-command';
        commandSpan.textContent = command;
        
        outputDiv.appendChild(promptSpan);
        outputDiv.appendChild(commandSpan);
        terminalBody.appendChild(outputDiv);
    }
    
    // Função para adicionar uma resposta ao terminal
    function addResponse(response, className = '') {
        const responseDiv = document.createElement('div');
        responseDiv.className = `terminal-response ${className}`;
        
        // Divide a resposta em linhas para melhor formatação
        const lines = response.split('\n');
        responseDiv.textContent = lines.join('\n');
        
        terminalBody.appendChild(responseDiv);
    }
    
    // Função para autocompletar comandos
    function autoCompleteCommand() {
        const input = terminalInput.value.trim().toLowerCase();
        if (input) {
            const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matchingCommands.length === 1) {
                terminalInput.value = matchingCommands[0];
            } else if (matchingCommands.length > 1) {
                addCommand(input);
                addResponse(matchingCommands.join('  '), 'command-info');
            }
        }
    }
    
    // Foca no input quando o terminal é clicado
    document.querySelector('.terminal-container').addEventListener('click', function() {
        terminalInput.focus();
    });
    
    // Foca no input ao carregar a página
    terminalInput.focus();
});