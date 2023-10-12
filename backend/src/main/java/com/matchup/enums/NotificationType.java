package com.matchup.enums;

public enum NotificationType{
    DEFAULT(1),
    PENDING(2),
    ACCEPTED(3),
    REJECTED(4);

    private final int valor;

    NotificationType(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return this.valor;
    }
}
