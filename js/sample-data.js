// js/sample-data.js
function initializeSampleData() {
    console.log("Verificando dados de exemplo...");

    // --- USUÁRIOS ---
    if (!localStorage.getItem('passeios_da_serra_usuarios')) {
        console.log("Inicializando usuários de exemplo...");
        const sampleUsers = [
            { id: '101', name: 'Yohan Montanhista', email: 'yohan@guia.com', password: '123', creatorStatus: 'verified', publicName: 'Yohan Montanhista', tagline: 'Especialista em Trilhas e Aventuras', avatarUrl: 'assets/images/DonoPasseio.jpg', bannerUrl: 'assets/images/ImagemBlogBanner.jpg', publicBio: '<p>Olá! Sou Yohan, guia profissional...</p>', cadasturNumber: '1234567890', languages: ['Português', 'Inglês'], createdAt: '2025-01-10', bankDetails: { banco: 'Banco Exemplo', agencia: '1234', conta: '56789-0' } },
            { id: '102', name: 'Ana Cozinheira', email: 'ana@guia.com', password: '123', creatorStatus: 'verified', publicName: 'Ana Gourmet', tagline: 'Sabores da Serra', avatarUrl: 'assets/images/ImagemUsuario.jpg', publicBio: '<p>Amo cozinhar e mostrar os ingredientes locais!</p>', createdAt: '2025-02-15' },
            { id: 'user1', name: 'Carlos Turista', email: 'carlos@email.com', password: '123', creatorStatus: 'none', avatarUrl: 'assets/images/ImagemUsuario2.jpg', createdAt: '2025-03-01' },
            { id: 'user2', name: 'Beatriz Viajante', email: 'bia@email.com', password: '123', creatorStatus: 'none', createdAt: '2025-04-22' }
        ];
        localStorage.setItem('passeios_da_serra_usuarios', JSON.stringify(sampleUsers));
    }

    // --- PASSEIOS ---
    // A classe PasseiosManager já tem um loadSampleData, mas podemos garantir aqui
    if (!localStorage.getItem('passeios_da_serra_passeios')) {
        console.log("Inicializando passeios de exemplo (via sample-data)...");
         const samplePasseios = [
            { id: '1', title: 'Trilha Incrível da Pedra do Baú', category: 'aventura', location: 'São Bento do Sapucaí, SP', shortDesc: 'Subida emocionante com vistas espetaculares.', longDesc: 'Aventura completa na Pedra do Baú...', duration: 6, difficulty: 'dificil', includedItems: ['equipamentos', 'seguro'], requirements: 'Bom preparo físico, água, lanche.', price: 150, maxParticipants: 10, datesAvailability: [{date: '2025-10-28', time: '08:00'}, {date: '2025-11-04', time: '08:00'}], cancelationPolicy: 'moderada', mainImage: 'ImagenPasseioTrilhaPedraDoBau.jpeg', galleryImages: ['ImagemTrilha1.jpeg', 'ImagemTrilha2.jpg', 'ImagemTrilha3.jpg'], rating: 4.8, reviews: 15, creatorId: '101', mapImageUrl: 'MapPedraDoBau.jpg', mapsLink: 'https://goo.gl/maps/example', locationDetailed: 'Entrada do Monumento Natural Pedra do Baú' },
            { id: '2', title: 'Delícias de Campos: Tour Gastronômico', category: 'gastronomia', location: 'Campos do Jordão, SP', shortDesc: 'Prove chocolates, fondues e vinhos locais.', longDesc: 'Um roteiro delicioso pelos melhores pontos...', duration: 4, difficulty: 'facil', includedItems: ['refeicoes', 'bebidas'], requirements: 'Apetite!', price: 220, maxParticipants: 8, datesAvailability: [{date: '2025-10-29', time: '13:00'}, {date: '2025-11-05', time: '13:00'}], cancelationPolicy: 'flexivel', mainImage: 'ImagemTourGastronomico.jpg', galleryImages: [], rating: 4.9, reviews: 22, creatorId: '102', locationDetailed: 'Em frente ao Baden Baden Choperia' },
            { id: '3', title: 'Viagem no Tempo: Passeio de Maria Fumaça', category: 'cultural', location: 'Campos do Jordão, SP', shortDesc: 'Reviva a história na charmosa Maria Fumaça.', longDesc: 'Um passeio nostálgico pela antiga ferrovia...', duration: 2.5, difficulty: 'facil', includedItems: ['transporte'], requirements: 'Chegar 20 min antes.', price: 95, maxParticipants: 30, datesAvailability: [{date: '2025-10-30', time: '10:00'}, {date: '2025-10-30', time: '15:00'}], cancelationPolicy: 'rigorosa', mainImage: 'ImagemPasseioTremPasseiosDaSerra.jpg', galleryImages: [], rating: 4.5, reviews: 31, creatorId: '101', locationDetailed: 'Estação Emílio Ribas' }
            // Adicione mais passeios se desejar
        ];
        localStorage.setItem('passeios_da_serra_passeios', JSON.stringify(samplePasseios));
    }

    // --- RESERVAS ---
    if (!localStorage.getItem('passeios_da_serra_reservas')) {
        console.log("Inicializando reservas de exemplo...");
        const sampleBookings = [
            { reservaId: 'PSR-NOW123', passeioId: '1', userId: 'user1', userName: 'Carlos Turista', dataPasseio: '2025-10-28', horaPasseio: '08:00', participantes: 2, valorTotal: 300, statusReserva: 'confirmed', dataReservaEfetuada: '2025-10-20' },
            { reservaId: 'PSR-LAT456', passeioId: '2', userId: 'user2', userName: 'Beatriz Viajante', dataPasseio: '2025-11-05', horaPasseio: '13:00', participantes: 1, valorTotal: 220, statusReserva: 'pending', dataReservaEfetuada: '2025-10-21' },
             { reservaId: 'PSR-OLD789', passeioId: '3', userId: 'user1', userName: 'Carlos Turista', dataPasseio: '2025-09-15', horaPasseio: '10:00', participantes: 3, valorTotal: 285, statusReserva: 'completed', dataReservaEfetuada: '2025-09-01' } // Reserva concluída
        ];
        localStorage.setItem('passeios_da_serra_reservas', JSON.stringify(sampleBookings));
    }

    // --- AVALIAÇÕES ---
    if (!localStorage.getItem('passeios_da_serra_avaliacoes')) {
        console.log("Inicializando avaliações de exemplo...");
        const sampleReviews = [
             { id: 'revG1', userId: 'user1', userName: 'Carlos Turista', userAvatar: 'assets/images/ImagemUsuario2.jpg', passeioId: '1', rating: 5, title: 'Experiência Fantástica!', text: 'O Yohan é um guia excepcional, conhece tudo da região e tornou a trilha muito segura e divertida. As vistas são de tirar o fôlego. Recomendo 100%!', date: '2025-10-01', guideResponse: 'Muito obrigado, Carlos! Foi um prazer!' , guideResponseDate: '2025-10-02', likes: 5},
             { id: 'revG2', userId: 'user2', userName: 'Beatriz Viajante', userAvatar: 'assets/images/ImagemUsuario.jpg', passeioId: '1', rating: 4, title: 'Muito bom!', text: 'Trilha ótima, um pouco cansativa mas valeu a pena.', date: '2025-09-26', guideResponse: null, likes: 2 },
             { id: 'revG3', userId: 'user1', userName: 'Carlos Turista', userAvatar: 'assets/images/ImagemUsuario2.jpg', passeioId: '3', rating: 5, title: 'Passeio de trem encantador!', text: 'Adoramos a viagem, paisagens lindas.', date: '2025-09-18', guideResponse: null, likes: 8 }
        ];
        localStorage.setItem('passeios_da_serra_avaliacoes', JSON.stringify(sampleReviews));
    }

    // --- FAVORITOS ---
    if (!localStorage.getItem('passeios_da_serra_favoritos_ids')) {
        console.log("Inicializando favoritos de exemplo...");
        localStorage.setItem('passeios_da_serra_favoritos_ids', JSON.stringify(['1', '3'])); // Exemplo: Passeios 1 e 3 favoritados
    }

     // --- E-MAIL LEMBRADO ---
    // Não inicializar, deixar vazio ou com o último usado.

    console.log("Verificação de dados de exemplo concluída.");
}