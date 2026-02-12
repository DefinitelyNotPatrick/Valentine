# Zostaniesz moją walentynką? ❤️

Interaktywna strona internetowa do zaproponowania udziału w Walentynkach z animacjami, dźwiękami i zabawnymi wiadomościami.

## ✨ Funkcje

- 🎯 **Interaktywne przyciski** - przycisk "Nie" uciekający przed kursorem
- 🎨 **Animacje** - spadające serca, animacja typewriter pytania, pulsujące serce na ekranie sukcesu
- 🔊 **Dźwięki** - wesoły dźwięk na "Tak", smutny na "Nie"
- 😄 **Zabawne wiadomości** - zmienne tekst pytania po każdym kliknięciu "Nie"
- 💥 **Eksplozja serc** - animacja serc rozbiegających się ze środka ekranu
- ✨ **Efekty sparkle** - iskierki pojawiające się przy klikaniu
- 📱 **Responsywny design** - działa na urządzeniach mobilnych

## 🎮 Jak grać

1. Przeczytaj pytanie
2. Jeśli chcesz powiedzieć "Tak" - kliknij zielony przycisk 🟢
3. Jeśli chcesz powiedzieć "Nie" - przycisk sam przed tobą ucieka! 🏃
4. Po każdym kliknięciu "Nie" pojawia się nowa zabawna wiadomość
5. Po kliknięciu "Tak" pojawia się ekran sukcesu ze świętowaniem 🎉

## 🚀 Jak uruchomić

1. Otwórz plik `index.html` w przeglądarce
2. Lub uruchom lokalny serwer:
   ```bash
   python3 -m http.server 8000
   ```
   Następnie otwórz [http://localhost:8000](http://localhost:8000)

## 📁 Struktura projektu

```
Walentynki/
├── index.html           # Główna strona HTML
├── style.css           # Style i animacje CSS
├── script.js           # Logika JavaScript
├── mis.png            # Obrazek misia na pytanie
├── mis-koncowy.png    # Obrazek misia na ekranie sukcesu
└── README.md          # Ten plik
```

## 🛠️ Technologie

- **HTML5** - struktura strony
- **CSS3** - style i animacje (keyframes, transforms)
- **JavaScript (Vanilla)** - interaktywność i dźwięki
- **Web Audio API** - generowanie dźwięków

## 🎨 Animacje

- **Typewriter** - tekst pytania pojawia się jak na maszynie do pisania
- **Bounce** - misiaczek hupka w górę i dół
- **Fall** - serca spadają z góry ekranu
- **Heartbeat** - pulsowanie serca na ekranie sukcesu
- **Shake** - drżenie przycisku "Nie"
- **Explode** - eksplozja serc w różnych kierunkach

## 🔊 Dźwięki

- **Dźwięk na "Tak"**: Rosnący akord (C5 → E5 → G5) - wesoły
- **Dźwięk na "Nie"**: Opadający akord (G4 → F4 → E4) - smutny

Dźwięki są generowane dynamicznie za pomocą Web Audio API.

## 📝 Customizacja

Możesz łatwo zmienić:

- Wiadomości w tablicy `funnyMessages` w `script.js`
- Kolory w `style.css` (gradientu, przycisków, tekstu)
- Obrazki misia (zamień `mis.png` i `mis-koncowy.png`)
- Częstotliwość dźwięków w funkcjach `playYesSound()` i `playNoSound()`



Powodzenia! 💕

---

_Stworzony z ❤️ na Dzień Świętego Walentego_
