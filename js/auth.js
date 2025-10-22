// Em js/auth.js

class Auth {
    constructor() {
        // Use os nomes padronizados das chaves
        this.users = JSON.parse(localStorage.getItem('passeios_da_serra_usuarios')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('passeios_da_serra_usuario_logado')) || null;
    }

    register(userData) {
        const userExists = this.users.some(user => user.email === userData.email);
        if (userExists) {
            return { success: false, message: 'Este email já está cadastrado.' };
        }

        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // Inseguro para produção!
            preferences: userData.preferences || [],
            interests: userData.interests || '',
            createdAt: new Date().toISOString(),
            creatorStatus: 'none', // Padrão para novos usuários
            cpf: null,
            birthDate: null,
            fullAddress: null,
            agreedToCreatorTerms: false,
            // Adicione um campo para diferenciar admin, se necessário
            isAdmin: false
        };

        this.users.push(newUser);
        localStorage.setItem('passeios_da_serra_usuarios', JSON.stringify(this.users));
        // Tenta fazer login após o registro
        const loginResult = this.login(userData.email, userData.password);
        return loginResult.success ? { success: true, user: newUser } : { success: false, message: 'Erro ao fazer login após registro.' };

    }

    login(email, password) {
        // 1. Tenta encontrar um usuário normal na lista salva
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('passeios_da_serra_usuario_logado', JSON.stringify(user));
            console.log("Login normal:", user.name);
            return { success: true, user };
        } else {
            // --- CÓDIGOS "MÁGICOS" ADICIONADOS ---

            // 2. Verifica se é o login especial do Guia
            const emailGuiaApresentacao = "guia@apresentacao.com";
            const senhaGuiaApresentacao = "guia123";

            if (email === emailGuiaApresentacao && password === senhaGuiaApresentacao) {
                console.log("Login especial de Guia Verificado!");
                const guiaApresentacao = {
                    id: 'guia-apresentacao-id',
                    name: 'Guia Apresentação',
                    email: emailGuiaApresentacao,
                    password: senhaGuiaApresentacao,
                    createdAt: new Date().toISOString(),
                    creatorStatus: 'verified', // <<< Guia Verificado!
                    isAdmin: false,
                    // Adicione outros campos necessários para um guia
                    publicName: 'Guia Apresentação',
                    tagline: 'Guia Especial para Demonstração',
                    avatarUrl: 'assets/images/DonoPasseio.jpg',
                    publicBio: '<p>Guia especial para a apresentação.</p>'
                };
                this.currentUser = guiaApresentacao;
                localStorage.setItem('passeios_da_serra_usuario_logado', JSON.stringify(guiaApresentacao));
                return { success: true, user: guiaApresentacao };
            }

            // 3. Verifica se é o login especial do Admin
            const emailAdminApresentacao = "admin@apresentacao.com";
            const senhaAdminApresentacao = "admin123";

            if (email === emailAdminApresentacao && password === senhaAdminApresentacao) {
                console.log("Login especial de Administrador!");
                const adminApresentacao = {
                    id: 'admin-apresentacao-id',
                    name: 'Admin Apresentação',
                    email: emailAdminApresentacao,
                    password: senhaAdminApresentacao,
                    createdAt: new Date().toISOString(),
                    creatorStatus: 'none', // Admin não é guia
                    isAdmin: true // <<< Administrador!
                    // Adicione outros campos necessários para um admin
                };
                this.currentUser = adminApresentacao;
                localStorage.setItem('passeios_da_serra_usuario_logado', JSON.stringify(adminApresentacao));
                return { success: true, user: adminApresentacao };
            }

            // --- FIM DOS CÓDIGOS ADICIONADOS ---

            // 4. Se não for nenhum dos anteriores, retorna erro
            return { success: false, message: 'Email ou senha incorretos.' };
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('passeios_da_serra_usuario_logado');
        console.log("Usuário deslogado.");
        return { success: true };
    }

    isAuthenticated() {
        // Recarrega do localStorage para garantir que está atualizado
        this.currentUser = JSON.parse(localStorage.getItem('passeios_da_serra_usuario_logado')) || null;
        return this.currentUser !== null;
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('passeios_da_serra_usuario_logado')) || null;
        return this.currentUser;
    }

    updateCurrentUserData(dataToUpdate) {
        if (!this.currentUser) return false;

        // Não atualiza usuários "mágicos" na lista principal, pois eles não existem lá
        const isMagicUser = this.currentUser.id === 'guia-apresentacao-id' || this.currentUser.id === 'admin-apresentacao-id';

        // Atualiza a instância local e o localStorage do usuário logado
        this.currentUser = { ...this.currentUser, ...dataToUpdate };
        localStorage.setItem('passeios_da_serra_usuario_logado', JSON.stringify(this.currentUser));

        // Atualiza na lista 'users' principal SOMENTE se NÃO for um usuário mágico
        if (!isMagicUser) {
            // Recarrega a lista de usuários do localStorage para garantir consistência
            this.users = JSON.parse(localStorage.getItem('passeios_da_serra_usuarios')) || [];
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...dataToUpdate };
                localStorage.setItem('passeios_da_serra_usuarios', JSON.stringify(this.users));
            } else {
                // Se o usuário logado não estava na lista (pode acontecer se o localStorage for limpo),
                // talvez adicioná-lo? Ou apenas logar o aviso. Para a demo, logar é suficiente.
                console.warn('Usuário logado não encontrado na lista principal ao tentar atualizar.');
            }
        }
        console.log('User data updated in localStorage (current user):', this.currentUser);
        return true;
    }
}

// Inicializar auth (Instância única)
const auth = new Auth();

// --- Manipuladores de Formulário (ESSA PARTE PRECISA SER AJUSTADA) ---
// A lógica original redirecionava todos para index.html. Precisamos diferenciar.

// **Remova** os manipuladores de formulário (`loginForm.addEventListener` e `registerForm.addEventListener`)
// que estão no final do seu arquivo `js/auth.js`.

// **Por quê?** O arquivo `js/login-page-features.js` já contém `addEventListener` para os formulários
// `login-form` e `register-form` e já inclui a lógica de redirecionamento (`getRedirectUrl`)
// e outras melhorias (lembrar-me, validação, etc.). Ter dois listeners para o mesmo formulário causa conflitos.

// **Onde colocar a lógica de redirecionamento por tipo de usuário?**
// No arquivo `js/login-page-features.js`, dentro do `loginForm.addEventListener('submit', ...)`:

/* Substitua esta parte em js/login-page-features.js:
    if (result.success) {
        // ... (lógica do lembrar-me) ...
        const redirectUrl = getRedirectUrl();
        window.location.href = redirectUrl ? decodeURIComponent(redirectUrl) : 'index.html';
    } else {
        displayFormStatus(loginStatusMsg, result.message, 'error');
    }
*/

/* Por esta: */
    if (result.success) {
        // Lógica do "Lembrar-me"
        if (rememberMeCheckbox && rememberMeCheckbox.checked) {
            localStorage.setItem('passeios_da_serra_lembrar_email', email); // Use a chave padronizada
        } else {
            localStorage.removeItem('passeios_da_serra_lembrar_email'); // Use a chave padronizada
        }

        const loggedInUser = result.user; // Pega o objeto do usuário que logou
        const intendedRedirect = getRedirectUrl(); // Verifica se havia um redirecionamento na URL

        // --- Lógica de Redirecionamento por Tipo ---
        if (loggedInUser.isAdmin) {
            // Se for Admin, vai para o dashboard admin
            window.location.href = 'admin-dashboard.html';
        } else if (loggedInUser.creatorStatus === 'verified') {
            // Se for Guia Verificado, vai para o painel do guia
            window.location.href = 'guia-painel/dashboard.html';
        } else if (intendedRedirect) {
            // Se for usuário normal E tinha um redirect na URL, vai para lá
             window.location.href = decodeURIComponent(intendedRedirect);
        }
         else {
            // Se for usuário normal E não tinha redirect, vai para a home
            window.location.href = 'index.html';
        }

    } else {
        // Se o login falhou (result.success é false)
        displayFormStatus(loginStatusMsg, result.message || 'Falha no login.', 'error');
    }
/* Fim da substituição */


// --- Verificação de Páginas Protegidas ---
// Mantenha esta parte no final do js/auth.js como estava antes.
const protectedPages = ['perfil.html', 'criar-passeio.html', 'favoritos.html', 'minhas-avaliacoes.html', 'configuracoes.html']; // Adicione outras páginas se necessário
// Adicione as páginas do painel do guia e admin
const guidePages = ['guia-painel/dashboard.html', 'guia-painel/meus-passeios.html', 'guia-painel/minhas-reservas.html', 'guia-painel/calendario-guia.html', 'guia-painel/meu-financeiro.html', 'guia-painel/minhas-avaliacoes-guia.html', 'guia-painel/mensagens-guia.html', 'guia-painel/editar-perfil-guia.html'];
const adminPages = ['admin-dashboard.html', 'admin/users.html', 'admin/tours.html', 'admin/bookings.html', 'admin/reviews.html', 'admin/financial.html', 'admin/settings.html', 'admin/support.html'];

const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual
const currentPageWithPath = window.location.pathname; // Pega o caminho completo

document.addEventListener('DOMContentLoaded', function() { // Executa após o HTML carregar
    const currentUser = auth.getCurrentUser(); // Pega o usuário logado (ou null)

    // Verifica páginas protegidas GERAIS (precisa estar logado)
    if (protectedPages.includes(currentPage)) {
        if (!currentUser) {
            console.log(`Acesso negado a ${currentPage}. Redirecionando para login.`);
            window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
            return; // Interrompe a execução
        }
    }

    // Verifica páginas do PAINEL DO GUIA (precisa ser guia verificado)
    const isGuidePage = guidePages.some(page => currentPageWithPath.endsWith(page));
    if (isGuidePage) {
        if (!currentUser || currentUser.creatorStatus !== 'verified') {
            console.log(`Acesso negado a ${currentPageWithPath}. Redirecionando para login.`);
            alert("Acesso restrito a guias verificados.");
            window.location.href = `../login.html?redirect=${encodeURIComponent(currentPageWithPath.substring(1))}`; // Ajusta o caminho de volta
            return;
        }
    }

     // Verifica páginas do PAINEL ADMIN (precisa ser admin)
    const isAdminPage = adminPages.some(page => currentPageWithPath.endsWith(page));
     if (isAdminPage) {
        if (!currentUser || !currentUser.isAdmin) {
            console.log(`Acesso negado a ${currentPageWithPath}. Redirecionando para login.`);
             alert("Acesso restrito a administradores.");
             // Decide para onde redirecionar se não for admin (login ou home?)
             window.location.href = `../login.html`; // Ajusta caminho de volta
             return;
        }
    }

     // Lógica específica para criar-passeio.html (precisa ser guia verificado)
    // Essa lógica já está sendo tratada em criar-passeio-features.js e no início de cadastro-criador.html (via script inline)
    // Mas podemos reforçar aqui se necessário.
     if (currentPage === 'criar-passeio.html') {
         if (!currentUser || currentUser.creatorStatus !== 'verified') {
             // A lógica nos outros arquivos já deve redirecionar, mas como garantia:
             console.log("Tentativa de acesso a criar-passeio.html sem ser guia verificado.");
             // O redirecionamento já acontece nos scripts específicos da página.
         }
     }
});