package com.matchup.dto;

import java.util.List;

public class SearchRequestDto {
    private String column;
    private List<String> values;

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

    public List<String> getValues() {
        return values;
    }

    public void setValues(List<String> values) {
        this.values = values;
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
