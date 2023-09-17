package com.matchup.dto;

public class SearchRequestDto {
    private String column;
    private String value;

    private Operation operation;
    private String joinTable;


    public enum Operation {
        EQUAL, LIKE, IN, GREATER_THAN, LOWER_THAN, BETWEEN, JOIN
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Operation getOperation() {
        return operation;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
    }

    public String getJoinTable() {
        return joinTable;
    }

    public void setJoinTable(String joinTable) {
        this.joinTable = joinTable;
    }
}
